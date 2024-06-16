import { z } from 'zod';

// Define Zod schemas
const createUserNameSchemaZod = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
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
    )
    .optional(),
});

const createGuardianSchemaZod = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const createLocalGuardianSchemaZod = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameSchemaZod.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: createGuardianSchemaZod.optional(),
      localGuardian: createLocalGuardianSchemaZod.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }).optional(),
  }).optional(),
});


const updateUserNameSchemaZod = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
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
    )
    .optional(),
});

const updateGuardianSchemaZod = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianSchemaZod = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateUserNameSchemaZod.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianSchemaZod.optional(),
      localGuardian: updateLocalGuardianSchemaZod.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }).optional(),
  }).optional(),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
