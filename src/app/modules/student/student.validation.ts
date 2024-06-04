import { z } from 'zod';

// Define Zod schemas
const userNameSchemaZod = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is Required')
    .refine(
      (value) => {
        const lastNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return lastNameStr === value;
      },
      { message: 'Last Name must be capitalized' },
    ),
});

const guardianSchemaZod = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchemaZod = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchemaZod,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchemaZod,
      localGuardian: localGuardianSchemaZod,
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  })

export const studentValidations = {
  createStudentValidationSchema,
};
