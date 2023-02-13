"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="border px-4 py-2 rounded-md m-4 hover:shadow-sm hover:shadow-slate-300"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
