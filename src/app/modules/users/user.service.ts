import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import config from '../../index';
import { TUSer } from './user.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a new user object

  const userData: Partial<TUSer> = {};

  //if password not given, use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set manually generated id
  userData.id = generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id; //embedding Id
    payload.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
