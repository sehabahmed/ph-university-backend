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

router.get('/', OfferedCourseController.getAllOfferedCourse);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
