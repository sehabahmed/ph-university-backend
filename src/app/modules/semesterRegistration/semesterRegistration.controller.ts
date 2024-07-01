import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.createSemesterRegistration(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Semester Registration Successfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester registrations are Retrieve Successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {

  const { registrationId } = req.params;

  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(
      registrationId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is Retrieve Successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {

  const { registrationId } = req.params;

  const result =
    await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
      registrationId,
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration Updated Successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
