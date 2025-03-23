import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getAllCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseController.getSingleCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  courseController.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student),
  courseController.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  courseController.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
