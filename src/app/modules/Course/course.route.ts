import express from 'express';
import validateRequest from '../utils/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';
const router = express.Router();

router.post('/create-course', validateRequest(courseValidations.createCourseValidationSchema), courseController.createCourse);

router.get('/', courseController.getAllCourses);

router.get('/:id', courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

export const CourseRoutes = router;

