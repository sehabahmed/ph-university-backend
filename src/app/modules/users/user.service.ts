import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import config from '../../index';
import { TUSer } from './user.interface';
import { StudentModel } from '../student/student.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a new user object

  const userData: Partial<TUSer> = {};

  //if password not given, use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set manually generated id

  userData.id = '35434563463';

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id; //embedding Id
    studentData.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
