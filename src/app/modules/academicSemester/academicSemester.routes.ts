import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterController.createAcademicController,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicSemesterController.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterController.singleAcademicSemesterController,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.updateAcademicValidationSchema),
  AcademicSemesterController.updateAcademicSemesterController,
);

export const AcademicSemesterRoutes = router;
