// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import axios from 'axios';

// export const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//         otp: { label: 'OTP', type: 'text', optional: true },
//       },
//       async authorize(credentials) {
//         const { email, password, otp } = credentials || {};
//         console.log("FOO",credentials)
//         if (otp) {
//           // OTP verification via Golang API
//           try {
//             const response = await axios.post(`${process.env.GOLANG_API_URL}/verify-otp`, { email, otp });
//             return response.data; // Assuming the API returns user data on success
//           } catch (error) {
//             throw new Error('Invalid OTP');
//           }
//         }

//         // Password-based login via Golang API
//         try {
//           const response = await axios.post(`${process.env.GOLANG_API_URL}/login`, { email, password });
//           return response.data; // Assuming the API sends user data on successful OTP initiation
//         } catch (error: any) {
//           throw new Error(error.response?.data?.message || 'Login failed');
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user as any;
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export const GET = (req: Request) => handler(req); // Handle GET requests
// export const POST = (req: Request) => handler(req); // Handle POST requests

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)