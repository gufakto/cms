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
