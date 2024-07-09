import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { StudentRoute } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academic.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { TodoRoutes } from '../modules/Todo/Todo.route';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students/',
    route: StudentRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/todo',
    route: TodoRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
