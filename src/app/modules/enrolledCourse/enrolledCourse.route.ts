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

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    enrolledCourseValidations.updateEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
