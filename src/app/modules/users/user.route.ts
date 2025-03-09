import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../utils/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
   validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  userControllers.changeStatus,
);

router.get(
  '/me',
  auth('student', 'faculty', 'admin'),
  userControllers.getMe,
);

export const UserRoutes = router;