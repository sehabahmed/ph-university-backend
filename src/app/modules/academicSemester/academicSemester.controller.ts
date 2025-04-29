import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created Successfully!',
    data: result
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester Data retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const singleAcademicSemesterController = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const result =
    await AcademicSemesterServices.singleAcademicSemester(academicSemesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got Single Academic Data!',
    data: result,
  });
});

const updateAcademicSemesterController = catchAsync( async (req, res) => {
    const { semesterId } = req.params;
    const updateData = req.body;

    const result = await AcademicSemesterServices.updateAcademicSemester(semesterId, updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester has been updated successfully!',
        data: result
    })
})

export const AcademicSemesterController = {
  createAcademicController,
  getAllAcademicSemester,
  singleAcademicSemesterController,
  updateAcademicSemesterController
};
