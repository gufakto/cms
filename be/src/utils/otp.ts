import otpGenerator from 'otp-generator';

const otpStore: Map<string, string> = new Map();

export const generateOTP = (key: string): string => {
    const otp = otpGenerator.generate(6, { specialChars: false });
    otpStore.set(key, otp);
    setTimeout(() => otpStore.delete(key), 5 * 60 * 1000); // OTP expires in 5 minutes
    return otp;
};

export const verifyOTP = (key: string, otp: string): boolean => {
    const storedOtp = otpStore.get(key);
    return storedOtp === otp;
};

/**
 * Generate a numeric OTP
 * @param length Length of the OTP
 * @returns A numeric OTP as a string
 */
export const generateNumericOTP = (key: string, length: number=6): string => {
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    otpStore.set(key, otp);
    setTimeout(() => otpStore.delete(key), 5 * 60 * 1000); // OTP expires in 5 minutes
    return otp;
};
