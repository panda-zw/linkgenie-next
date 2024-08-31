// components/SignIn.js
import React from 'react';
import { signIn } from 'next-auth/react';

const SignIn = ({ providers, csrfToken }) => {
    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.username.value;
                const password = e.target.password.value;
                signIn('credentials', { username, password });
            }}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input name="username" type="text" placeholder="Username" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>

            {providers && Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            ))}
        </div>
    );
};

export default SignIn;