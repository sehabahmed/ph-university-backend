import express from 'express';
import validateRequest from '../utils/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/', auth('admin', 'faculty', 'student'), courseController.getAllCourses);

router.get('/:id', auth('admin', 'faculty', 'student'), courseController.getSingleCourse);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete('/:id', auth('admin'), courseController.deleteCourse);

router.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesWithCourseValidationSchema), courseController.assignFacultiesWithCourse);


router.delete('/:courseId/remove-faculties', courseController.removeFacultiesFromCourse);

export const CourseRoutes = router;
