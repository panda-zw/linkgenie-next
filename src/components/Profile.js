"use client"

import { signOut } from "next-auth/react"

export default function Profile() {
    return (
        <div>
            <h1>
                Fatsoe
            </h1>
            <button onClick={() => signOut}>SignOut</button>
        </div>
    )
}