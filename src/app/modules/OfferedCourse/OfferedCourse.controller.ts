import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './OfferedCourse.service';
import { Request, Response } from 'express';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Created Successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Offered Course Successfully',
    data: result,
  });
});

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Offered Course Data retrieve Successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Offered Course Successfully!',
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Updated Successfully!',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.deleteOfferedCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Deleted Successfully!',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
