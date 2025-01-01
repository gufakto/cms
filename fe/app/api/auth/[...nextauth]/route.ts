import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text', optional: true },
        },
        async authorize(credentials) {
        const { email, password, otp } = credentials || {};
        if (otp) {
            // OTP verification via Golang API
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/verify-otp`, { email, otp });
                return response.data; // Assuming the API returns user data on success
            } catch (error) {
                throw new Error('Invalid OTP');
            }
        }

        // Password-based login via Golang API
        try {
            console.log("SIAGIAN SIAGIAN");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CONTAINER}/api/auth/login`, { email, password });
            return response.data; // Assuming the API sends user data on successful OTP initiation
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
        },
    }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
            token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user = token.user as any;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }