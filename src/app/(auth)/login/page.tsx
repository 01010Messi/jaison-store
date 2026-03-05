"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import GoldRule from "@/components/decorative/GoldRule";
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
    <div className="bg-cream p-8 rounded-sm border border-border/50 shadow-warm">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl text-bark">Welcome Back</h2>
        <div className="flex justify-center mt-2">
          <GoldRule variant="simple" width="w-16" />
        </div>
        <p className="text-sm text-bark/50 font-body mt-3">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bark/30 hover:text-bark/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-bark/40 hover:text-terracotta transition-colors font-accent"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-bark/50 font-body mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-terracotta hover:text-terracotta/80 transition-colors font-medium"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
