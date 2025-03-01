import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are Retrieve Successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Retrieve Successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await courseServices.updateCourseIntoDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Updated Successfully',
    data: result,
  });
});

//Delete Course Controller
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Deleted Successfully',
    data: result,
  });
});

//Course Faculty Controller
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.AssignFacultiesWithCourseIntoDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties Assigned Successfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.removeFacultiesFromCourseFromDB(courseId, faculties);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed Successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
