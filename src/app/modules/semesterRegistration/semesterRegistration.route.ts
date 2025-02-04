import express from 'express';
import validateRequest from '../utils/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

router.get(
  '/:registrationId',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:registrationId',
  validateRequest(
    semesterRegistrationValidations.updateRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
