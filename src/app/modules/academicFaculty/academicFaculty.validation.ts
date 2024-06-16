import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty Must be String!' }),
  }),
});

const updateAcademicValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty Must be String!' }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicValidationSchema,
  updateAcademicValidationSchema,
};
