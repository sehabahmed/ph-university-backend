import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthsSchema,
} from './academicSemester.constant';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...MonthsSchema] as [string, ...string[]]),
    endMonth: z.enum([...MonthsSchema] as [string, ...string[]]),
  }),
});

const updateAcademicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...MonthsSchema] as [string, ...string[]]).optional(),
    endMonth: z.enum([...MonthsSchema] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicValidationSchema,
  updateAcademicValidationSchema,
};
