import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
