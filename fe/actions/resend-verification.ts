"use server";

import * as z from "zod";
import axios from "axios";

export const resendVerificationFn = async (email: string) => {
    const check = z.string().email({
        message: "Email format is required!"
    }).safeParse(email);
    if (!check.success) {
        return { error: check.error.message };
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/re-send-verification/${email}`;
        const response = await axios.get(apiUrl);
        if(response.status===201){
            return { success: "Please check your email to varified your account", data: response.data };
        } else {
            return { error: "Unknown error" };
        }
    } catch (err: any) {
        console.error("Server error:", err.message);
        return { error: err.response.data.message || err.message || "Unknown error" };
    }
};

