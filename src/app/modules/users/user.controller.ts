import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createStudent = catchAsync(async (req, res) => {

  const { password, student: studentData } = req.body;

  //will call service function to send data
  const result = await UserServices.createStudentIntoDB(req.file, password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  // Ensure that facultyData is correctly parsed
  if (!facultyData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty data is required');
  }

  // Ensure that req.file is present
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Profile image is required');
  }

  //will call service function to send data
  const result = await UserServices.createFacultyIntoDB(req.file, password, facultyData);
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
  const result = await UserServices.createAdminIntoDB(req.file, password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created Successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated Successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;

  const { userId, role } = req.user;

  //will call service function to send data
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data retrieve Successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
