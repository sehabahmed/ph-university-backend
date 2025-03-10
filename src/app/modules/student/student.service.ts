import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const createStudentIntoDB = async (payload: TStudent) => {
  //static method
  // if(await TStudent.isUserExists(studentData.id)){
  //   throw new Error("User Already Exists!")
  // }
  const result = await StudentModel.create(payload);

  return result;
};

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  //Search Query
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // const queryObj = { ...query }; //copy

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // console.log({query}, {queryObj});

  //Filtering

  // excludeFields.forEach((elem) => delete queryObj[elem]);

  // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester');

  //Sorting

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);

  //   // Field Limiting

  //   let fields = '-__v';

  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //     // console.log({fields});
  //   }

  //   const fieldQuery = await limitQuery.select(fields);

  //   return fieldQuery;

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

//Get Single Product

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findById(id).populate('admissionSemester');

  // const result = await StudentModel.aggregate([{ $match: { id: id } }]);

  return result;
};

//update Student
const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  // Non primitive specific data update
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return result;
};

const deleteSingleStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    const userId = deletedStudent.user;

    const deletedUser = await User.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to Delete');
  }
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
  deleteSingleStudentFromDb,
};
