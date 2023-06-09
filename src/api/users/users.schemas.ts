import { z } from "zod";

const loginSchema = z.object({
    body: z.object({
        Name: z.string({
            required_error: "Username is required",
        }).min(3).max(50),
        Password: z.string({
            required_error: "Password is required",
        }).min(3).max(50),
    }),
});

const registerSchema = z.object({
    body: z.object({
        Name: z.string({
            required_error: "Username is required",
        }).min(3).max(50),
        Password: z.string({
            required_error: "Password is required",
        }).min(3).max(50),
        Email: z.string({
            required_error: "Email is required",
        }).email(),
        Phone: z.string({
            required_error: "Phone is required",
        }).min(3).max(50),
        Gender: z.enum([
            'Female', 'Male'
        ], {
            required_error: "Gender is required",
        }),
        Date_Of_Birth: z.date({
            required_error: "Date_Of_Birth is required",
        }),
    }),
});

export {
    loginSchema,
    registerSchema,
}