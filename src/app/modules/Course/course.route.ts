import express from 'express';
import validateRequest from '../utils/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourses);

router.get('/:id', courseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete('/:id', courseController.deleteCourse);

router.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseController.assignFacultiesWithCourse);


router.delete('/:courseId/remove-faculties', courseController.removeFacultiesFromCourse);

export const CourseRoutes = router;
