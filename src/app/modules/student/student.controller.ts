import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

//get all students

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieve Successfully',
    meta: result.meta,
    data: result.result,
  });
});

//get single student by id

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student data loaded successfully',
    data: result,
  });
});

//update student by id

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentIntoDb(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated data successfully',
    data: result,
  });
});

//delete student

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
