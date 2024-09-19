"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Failed to login: Incorrect email or password");
      console.error("Error signing in:", result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-oval-gradient from-[#375388] to-[#0e1726]">
      <section className="w-[600px] absolute top-[100px] border border-opacity-0 rounded">
        <h1 className="text-2xl text-white font-bold text-center mt-7">Welcome to <span className="text-green-500">LinkGenie</span></h1>
        <p className="text-center text text-white mt-3">Hello! We are thrilled to have you onboard</p>
        <div>

        </div>
        <form onSubmit={handleSubmit}>
        </form>
      </section>
    </div>
  );
}
