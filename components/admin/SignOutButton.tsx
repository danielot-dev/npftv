"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm font-semibold text-navy-dark/70 hover:text-signal"
    >
      Sign out
    </button>
  );
}
