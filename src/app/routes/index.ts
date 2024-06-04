import {Router} from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { StudentRoute } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students/',
        route: StudentRoute
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;