import { z } from 'zod';

const createTodoValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean().optional().default(false),
    priority: z.string()
  }),
});

const updateTodoValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean().optional().default(false),
    priority: z.string().optional()
  }),
});

export const TodoValidations = {
    createTodoValidationSchema,
    updateTodoValidationSchema
}
