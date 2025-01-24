import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    debug: true, // Enable debug messages in the console if you are having problems
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
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
            if (user) 
                token.user = user;
            
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user = token.user as any;
            return session;
        },
    },
    session: {
        strategy: 'jwt' as 'jwt' | 'database', // Use JWT for sessions
    },
    pages: {
        signIn: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST, authOptions }
