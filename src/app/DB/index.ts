import config from '../index';
import { USER_ROLE } from '../modules/users/user.constant';
import { User } from '../modules/users/user.model';
import logger from '../utils/logger';

const superUser = {
  id: '0001',
  email: 'sehabahmed50100@gmail.com',
  password: config.supe_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  try {
    //When database is connected, we will check there has any user who is superadmin

    const isSuperAdminExists = await User.findOne({
      id: superUser.id
    });

    if (!isSuperAdminExists) {
      await User.create(superUser);
    }
  } catch (err) {
    logger.error('Error Seeding super admin', err);
  }
};

export default seedSuperAdmin;
