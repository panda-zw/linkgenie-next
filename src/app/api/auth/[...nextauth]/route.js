import { connectDB } from "@/utils/connect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/User";
import bcrypt from "bcrypt";

async function login(credentials) {
  console.log("credentials login");
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Wrong Credentials.");
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new Error("Wrong Credentials.");
    return user;
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
          return user;
        } catch (error) {
          console.error("Authentication failed:", error.message);
          throw new Error("Failed to login.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username || null;
        token.email = user.email || null;
        token.id = user._id ? user._id.toString() : null;
        token.credits = user.credits || 0;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('session: ', session);
      if (session) {
        session.user.username = token.username || null;
        session.user.email = token.email || null;
        session.user.id = token.id || null;
        session.user.credits = token.credits || 0;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/SignIn",
    signUp: "/SignUp",
  },
  secret: process.env.NEXTAUTH_SECRET,
  async signIn({ account, profile }) {
    console.log("provider: ", account.provider);
    console.log("profile: ", profile);
    console.log("account: ", account);
    if (account.provider === "google")
      try {
        await connectDB();
        const user_exists = await User.findOne({
          where: {
            email: profile.email,
          },
        });

        if (!user_exists) {
          console.log("user not found, signing up with google auth");
          const new_user = await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            password: null,
            credits: 5,
          });
          console.log("user added with google: ", new_user);
        }else{
          console.log('user exists from google auth')
        }

        return true;
      } catch (error) {
        console.log("error signing in: ", error);
      }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
