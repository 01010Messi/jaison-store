"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full rounded-full font-body text-sm transition-colors focus:outline-none";
  const inputStyle = {
    padding: "14px 24px",
    border: "1px solid rgba(26,60,52,0.18)",
    backgroundColor: "transparent",
    color: "#1A3C34",
  };
  const labelClass = "block font-accent text-[10px] tracking-[0.15em] uppercase mb-2";
  const labelStyle = { color: "rgba(26,60,52,0.55)" };

  return (
    <div
      className="w-full rounded-2xl p-10"
      style={{ backgroundColor: "#FEFAE0", border: "1px solid rgba(26,60,52,0.1)" }}
    >
      {/* Header */}
      <div className="mb-8">
        <p
          className="font-accent text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ color: "#834316" }}
        >
          — Create Account
        </p>
        <h2
          className="font-heading font-light leading-[1.05]"
          style={{ fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "#1A3C34" }}
        >
          Join the family.
        </h2>
        <p
          className="mt-2 font-body text-sm leading-relaxed"
          style={{ color: "rgba(26,60,52,0.45)" }}
        >
          One account. All your orders and rituals in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            required
            className={inputClass}
            style={inputStyle}
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={`${inputClass} pr-12`}
              style={inputStyle}
              placeholder="Min. 8 characters"
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{
            padding: "16px 24px",
            backgroundColor: "#1A3C34",
            color: "#FEFAE0",
            marginTop: "8px",
          }}
        >
          {isLoading ? "Creating account..." : "Create Account →"}
        </button>
      </form>

      <p
        className="text-center font-body text-sm mt-8"
        style={{ color: "rgba(26,60,52,0.45)" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-accent text-[11px] tracking-[0.08em] uppercase transition-colors hover:opacity-70"
          style={{ color: "#834316" }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
