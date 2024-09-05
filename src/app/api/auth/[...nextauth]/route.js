import { connectDB } from "@/utils/connect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/User";
import bcrypt from 'bcrypt';

async function login(credentials) {
    try {
        await connectDB(); // Ensure you await the connection
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("Wrong Credentials.");
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Wrong Credentials.");
        return user; // Return the user instance, not the User model
    } catch (error) {
        console.log("Error logging in:", error);
        throw new Error("Something went wrong");
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user; // Return the user object if authentication is successful
                } catch (error) {
                    console.error("Authentication failed:", error.message);
                    throw new Error("Failed to login.");
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.email = user.email;
                token.id = user._id.toString(); // Ensure ID is a string
                token.credits = user.credits;
            }
            console.log("JWT token:", token);
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.id = token.id;
                session.user.credits = token.credits;
            }
            return session;
        }
    },
    pages: {
        signIn: '/SignIn',
        signUp: '/SignUp'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
