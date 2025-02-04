import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be a string",
    }).max(20, { message: 'Password can not be more than 20 character'}).optional(),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(['admin', 'student', 'faculty']),
});

export const userValidation = {
    userValidationSchema
};