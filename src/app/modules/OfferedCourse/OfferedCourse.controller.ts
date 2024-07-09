import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { OfferedCourseServices } from './OfferedCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Created Successfully',
    data: result,
  });
});

// const getAllOfferedCourse = catchAsync(async (req, res) => {
//     const result =
// })

export const OfferedCourseController = {
  createOfferedCourse,
};
