import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../sendResponse/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //creating a schema validation using Joi

    const { password, student: studentData } = req.body;

    //data validation using Zod

    // const zodParsedData = userValidation.parse(studentData);

    //will call service function to send data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    //send response
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created Successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created Successfully',
      data: result,
    });
  } catch (err) {
    next();
  }
};

export const userControllers = {
  createStudent,
};
