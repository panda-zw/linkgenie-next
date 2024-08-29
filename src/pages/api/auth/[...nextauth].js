import CredentialsProvider from "next-auth/providers/credentials";

providers: [
    CredentialsProvider({
        name: "Credentials",

        credentials: {
            username: {
                label: "Username", placeholder: "John Doe", type: "text"
            },
            password: {
                label: "Password", type: "********"
            },

            async authorize(credentials, req) {
                const user = { id: 1, name: "John Doe", email: "johndoe@gmail.com" }

                if (user) {
                    return user
                } else {
                    return null
                }
            }

        },
    })

    // additional providers


]