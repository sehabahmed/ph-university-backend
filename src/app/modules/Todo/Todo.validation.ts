import { z } from 'zod';

const createTodoValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean().optional().default(false),
    priority: z.string()
  }),
});

const updateTodoValidationSchema = z.object({
  body: z.object({

    title: z.string().optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional().default(false),
    priority: z.string().optional()
  }),
});

export const TodoValidations = {
    createTodoValidationSchema,
    updateTodoValidationSchema
}
