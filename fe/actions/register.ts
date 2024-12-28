"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import axios from "axios";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_CONTAINER}/api/users`;
        const response = await axios.post(apiUrl, validatedFields.data);
        if(response.status===201){
            return { success: "Thank you for your registration!", data: response.data };
        } else {
            return { error: "Unknown error" };
        }
    } catch (err: any) {
        console.error("Server error:", err.message);
        return { error: err.message || "Unknown error" };
    }
};
