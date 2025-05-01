import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse, { TMeta } from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await EnrolledCourseServices.createEnrolledCourse(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Enrolled Successfully',
    data: result
  });
});

const getFacultyEnrolledCourses = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const {meta, result} = await EnrolledCourseServices.getFacultyEnrolledCoursesFromDb(
    facultyId,
    req.query,
  );

  const formattedMeta: TMeta = {
    limit: meta.limit,
    page: meta.page,
    total: meta.total,
    totalPages: meta.totalPages,
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Faculty Enrolled Course Retrieve Successfully',
    meta: formattedMeta,
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;

  const {meta, result} = await EnrolledCourseServices.getMyEnrolledCousesFromDb(
    studentId,
    req.query,
  );

  const formattedMeta: TMeta = {
    limit: meta.limit,
    page: meta.page,
    total: meta.total,
    totalPages: meta.totalPages,
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Enrolled Course Retrieve Successfully',
    meta: formattedMeta,
    data: result,
  });
});


const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  //   const userId = req.user.userId;

  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(facultyId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated Successfully',
    data: result
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getFacultyEnrolledCourses,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
