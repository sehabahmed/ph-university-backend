import { UserServices } from './user.service';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
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

export const userControllers = {
  createStudent,
};
