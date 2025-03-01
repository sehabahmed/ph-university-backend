/* eslint-disable @typescript-eslint/no-explicit-any */
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import config from '../../index';
import { TUser } from './user.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import {
  generateStudentId,
  generatedAdminId,
  generatedFacultyId,
} from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepertment.model';
import { Admin } from '../Admin/admin.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a new user object

  const userData: Partial<TUser> = {};

  //if password not given, use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  //set Student email
  userData.email = payload.email;

  // find academic semester info

  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester Not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set automatically generated id
    userData.id = await generateStudentId(admissionSemester);
    //create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); //array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to create user');
    }

    payload.id = newUser[0].id; //embedding Id
    payload.user = newUser[0]._id; //reference _id

    //create a student (transaction - 2)

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(404, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // console.log(payload);
  //Create a new user object
  const userData: Partial<TUser> = {};

  //if password is not given, use Default password

  userData.password = password || (config.default_password as string);

  //set Student Role
  userData.role = 'faculty';
  //set faculty email
  userData.email = payload.email;

  //find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Set Generated ID
    userData.id = await generatedFacultyId();

    // Create a user (transaction 1)
    const newUser = await User.create([userData], { session }); //array

    // Create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //Set Id, _id as user

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // Create a Faculty (transaction 2)
    const newFaculty = await Faculty.create([payload], { session }); //array

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  //Create a new user object
  const userData: Partial<TUser> = {};

  //if password is not given, use Default password

  userData.password = password || (config.default_password as string);

  //set Student Role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Set Generated ID
    userData.id = await generatedAdminId();

    // Create a user (transaction 1)
    const newUser = await User.create([userData], { session }); //array

    // Create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //Set Id, _id as user

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // Create a Admin (transaction 2)
    const newAdmin = await Admin.create([payload], { session }); //array

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
