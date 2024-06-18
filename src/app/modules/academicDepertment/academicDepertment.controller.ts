import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AcademicDepertmentServices } from './academicDepertment.service';

const createAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepertmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment Created Successfully',
    data: result,
  });
});

const getAllAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepertmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertments Retrieve Successfully',
    data: result,
  });
});

const getSingleAcademicDepertment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepertmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment Retrieve Successfully',
    data: result,
  });
});

const updateAcademicDepertment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const updateData = req.body;
  const result =
    await AcademicDepertmentServices.updateAcademicDepartmentFromDB(
      departmentId,
      updateData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepertment,
  getAllAcademicDepertment,
  getSingleAcademicDepertment,
  updateAcademicDepertment,
};