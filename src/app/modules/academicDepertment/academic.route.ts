import express from 'express';
import validateRequest from '../utils/validateRequest';
import { AcademicDepartmentValidations } from './academicDepertment.validation';
import { AcademicDepartmentControllers } from './academicDepertment.controller';
const router = express.Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidaiton), AcademicDepartmentControllers.createAcademicDepertment);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepertment);

router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepertment);

router.patch('/:departmentId', validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidaiton), AcademicDepartmentControllers.updateAcademicDepertment);

export const AcademicDepartmentRoutes = router;