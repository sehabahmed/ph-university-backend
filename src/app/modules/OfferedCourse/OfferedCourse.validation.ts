import { z } from 'zod';
import { Days } from './OfferedCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          return regex.test(time);
        },
        {
          message: 'Invalid time format. Expected HH:MM (24-hour format).',
        },
      ), //HH:MM
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

          return regex.test(time);
        },
        {
          message: 'Invalid time format. Expected HH:MM (24-hour format).',
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}`);
        const end = new Date(`1970-01-01T${body.endTime}`);

        return end > start;
      },
      {
        message: 'Start Time should before end Time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
