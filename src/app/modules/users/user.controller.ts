import { UserServices } from './user.service';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  //creating a schema validation using Joi

  const { password, student: studentData } = req.body;

  //data validation using Zod

  // const zodParsedData = userValidation.parse(studentData);

  //will call service function to send data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {

  const { password, faculty: facultyData } = req.body;

  // console.log(facultyData);
  // console.log(req.body);
  //will call service function to send data
  const result = await UserServices.createFacultyIntoDB(password, facultyData);
// console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created Successfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {

  const { password, admin: adminData } = req.body;

  //will call service function to send data
  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created Successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin
};
