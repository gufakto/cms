"use server";

import { VerifyOTP } from "@/schemas";
import axios from "axios";
import * as z from "zod";


export const otpVerifyFn = async (values: z.infer<typeof VerifyOTP>) => {
    const validatedFields = VerifyOTP.safeParse(values);
    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/verify-otp`
        const res = await axios.post(apiUrl, {
            email: validatedFields.data.email,
            otp: validatedFields.data.verifycode
        });
        if(res.status===200) {
            return { success: res.statusText, data: res.data }
        }
    } catch(e: any) {
        if(e.status === 401 || e.status === 400) {
            return {error: e.response.data.message}
        }
        return {error: e.message || "Unknown error."}
    }
}