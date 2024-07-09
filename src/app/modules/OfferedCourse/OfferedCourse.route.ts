import express from 'express';
import validateRequest from '../utils/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';
const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

export const OfferedCourseRoutes = router;