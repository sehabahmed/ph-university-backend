import express from 'express';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
