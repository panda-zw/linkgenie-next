"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, update } = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/update/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo }),
      });

      if (res.ok) {
        toast.success(`user updated`);
      } else {
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <div>
      <h1>Fatsoe</h1>
      <button onClick={() => signOut}>SignOut</button>
    </div>
  );
}
