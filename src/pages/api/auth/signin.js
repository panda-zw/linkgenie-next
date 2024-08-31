// pages/auth/signin.js
import SignIn from "@/components/SignIn";
import { getProviders, getCsrfToken } from "next-auth/react";

const SignInPage = ({ providers, csrfToken }) => {
    return (
        <div>
            <SignIn providers={providers} csrfToken={csrfToken} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);

    return {
        props: { providers, csrfToken },
    };
}

export default SignInPage;