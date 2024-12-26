import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required! "
    }),
    password: z.string().min(1, {
        message: "Password is required!"
    }),
});

// Phone number regex
const phoneRegex = /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/
export const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email({
        message: "Email is required! "
    }),
    phone: z.string().regex(phoneRegex, {
        message: "invalid phone number"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required!"
    }),
})

