import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", placeholder: "John Doe", type: "text" },
                password: { label: "Password", type: "password", placeholder: "********" },
            },
            async authorize(credentials, req) {
                const user = { id: 1, name: "John Doe", email: "johndoe@gmail.com" }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
        // additional providers
    ],
    // additional NextAuth configuration (e.g., pages, callbacks)
})
