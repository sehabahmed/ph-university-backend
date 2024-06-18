import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../utils/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterController.createAcademicController,
);

router.get('/', AcademicSemesterController.getAllAcademicSemester);

router.get(
  '/:semesterId',
  AcademicSemesterController.singleAcademicSemesterController,
);

router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicValidationSchema),
  AcademicSemesterController.updateAcademicSemesterController,
);

<<<<<<< HEAD
export const AcademicSemesterRoutes = router;
=======
export const AcademicSemesterRoutes = router;
>>>>>>> origin/main
