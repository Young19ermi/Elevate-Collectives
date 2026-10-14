"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const field = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-gray-900";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [msg, setMsg] = useState("");
  return (
    <div className="mx-4 my-10 sm:mx-auto w-full max-w-md rounded-2xl border p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">{isLogin ? "Sign in" : "Create account"}</h1>
      <p className="mt-1 text-sm text-gray-500">{isLogin ? "Welcome back to Elevate." : "Join Elevate Shopping in a minute."}</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setMsg("Demo only: connect Supabase Auth in features/auth/api."); }}>
        {!isLogin && <label className="block text-sm">Full name<input required className={field} placeholder="Abebe Kebede" /></label>}
        <label className="block text-sm">Email<input required type="email" className={field} placeholder="you@example.com" /></label>
        <label className="block text-sm">Password<input required type="password" minLength={8} className={field} placeholder="At least 8 characters" /></label>
        <Button type="submit" className="w-full">{isLogin ? "Sign in" : "Create account"}</Button>
        {msg && <p className="text-sm text-amber-700">{msg}</p>}
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link className="text-gray-900 underline" href={isLogin ? "/signup" : "/login"}>{isLogin ? "Create account" : "Sign in"}</Link>
      </p>
    </div>
  );
}
