"use server";

import axios from "axios";

export const verificationFn = async (token: string) => {
    if (!token) {
        return { error: "Invalid token!" };
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/verification/${token}`;
        const response = await axios.get(apiUrl);
        if(response.status===200){
            return { success: response.data.message };
        } else {
            return { error: "Unknown error" };
        }
    } catch (err: any) {
        console.error("Server error:", err.response.data.message);
        
        return { error: err.response.data.message || err.message || "Unknown error" };
    }
};
