"use server";
import { LoginSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

export const loginFn = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/login`;
        const res = await axios.post(apiUrl, validatedFields.data);
        if(res.status===200) {
            return { success: "Success", data: res.data }
        } 
        return { error: res.statusText } 

    } catch(e: any) {
        return { error: e.message || "Unknown error" }
    }
}