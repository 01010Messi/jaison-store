"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/account");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full rounded-2xl p-10"
      style={{ backgroundColor: "var(--color-cream)", border: "1px solid rgba(26,60,52,0.1)" }}
    >
      {/* Header */}
      <div className="mb-8">
        <p
          className="font-accent text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ color: "var(--color-terracotta)" }}
        >
          — Sign In
        </p>
        <h2
          className="font-heading font-light leading-[1.05]"
          style={{ fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "var(--color-bark)" }}
        >
          Welcome back.
        </h2>
        <p
          className="mt-2 font-body text-sm leading-relaxed"
          style={{ color: "rgba(26,60,52,0.45)" }}
        >
          Sign in to your account to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block font-accent text-[10px] tracking-[0.15em] uppercase mb-2"
            style={{ color: "rgba(26,60,52,0.55)" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full font-body text-sm transition-colors"
            style={{
              padding: "14px 24px",
              border: "1px solid rgba(26,60,52,0.18)",
              backgroundColor: "transparent",
              color: "var(--color-bark)",
            }}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            className="block font-accent text-[10px] tracking-[0.15em] uppercase mb-2"
            style={{ color: "rgba(26,60,52,0.55)" }}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-full font-body text-sm transition-colors pr-12"
              style={{
                padding: "14px 24px",
                border: "1px solid rgba(26,60,52,0.18)",
                backgroundColor: "transparent",
                color: "var(--color-bark)",
              }}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "rgba(26,60,52,0.3)" }}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="font-accent text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-70"
            style={{ color: "rgba(26,60,52,0.4)" }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{
            padding: "16px 24px",
            backgroundColor: "var(--color-bark)",
            color: "var(--color-cream)",
            marginTop: "8px",
          }}
        >
          {isLoading ? "Signing in..." : "Sign In →"}
        </button>
      </form>

      <p
        className="text-center font-body text-sm mt-8"
        style={{ color: "rgba(26,60,52,0.45)" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-accent text-[11px] tracking-[0.08em] uppercase transition-colors hover:opacity-70"
          style={{ color: "var(--color-terracotta)" }}
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
