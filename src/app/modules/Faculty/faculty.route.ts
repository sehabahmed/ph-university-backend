import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../utils/validateRequest';
import {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
} from './faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createFaculty,
);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.faculty, USER_ROLE.admin), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
