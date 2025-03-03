import { z } from "zod";
import { UserStatus } from "./user.constant";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be a string",
    }).max(20, { message: 'Password can not be more than 20 character'}).optional(),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(['admin', 'student', 'faculty']),
});

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]])
    })
})

export const userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
};