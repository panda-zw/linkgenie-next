import { connectDB } from "@/utils/connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/User";
import bcrypt from 'bcrypt';

async function login(credentials) {
    try {
        connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!User) throw new Error("Wrong Credentials.");
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Wrong Credentials.")
        return User;

    } catch (error) {
        console.log("error logging in.");
        throw new Error("Something went wrong")

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
                    const user = await login(credentials)
                    return user;
                } catch (error) {
                    throw new Error("Failed to login.")
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.email = user.email;
                token.id = user.id;
            }

            console.log("This is a tokenm =", token)
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.id = token.id
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
export { handler as GET, handler as POST } 