"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "@/lib/utils";

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = (formData.get("identifier") as string)?.trim();
    const password = formData.get("password") as string;

    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const payload = isEmail
      ? { email: identifier, password }
      : { phone: identifier, email: identifier, password };

    axios
      .post(`${server}/api/v1/auth/login`, payload)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!", { duration: 1000, id: "login-success", icon: "👏" });
          if (response.data && response.data.data) {
            const resData = response.data.data;
            const role = resData.user?.role ? resData.user.role.toLowerCase() : "";
            localStorage.setItem("role", role);
            localStorage.setItem("jwt", resData.tokens?.accessToken || "");
            
            // Set cookies for middleware
            setCookie("role", role);
            setCookie("jwt", resData.tokens?.accessToken || "");
            
            if (resData.profile) {
              localStorage.setItem("firstName", resData.profile.firstName);
            }
            setTimeout(() => {
              router.push(`/${role}`);
            }, 1000);
          } else {
            toast.error("User data not found. Please contact support.");
          }
        } else {
          toast.error(response.data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        let message = "Login failed. Please try again.";
        if (error.response) {
          if (error.response.status === 429) {
            message = "Too many attempts. Please try again after 15 minutes.";
          } else {
            message = error.response.data?.error?.message || error.response.data?.message || message;
          }
        } else if (error.request) {
          message = "No response from server. Check your connection.";
        } else {
          message = error.message;
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div
        className="flex flex-col lg:flex-row min-h-screen w-full bg-[#080810] text-[#EEEDF8] overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Left panel (Image + Quote) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#0D0D1A] overflow-hidden">
  {/* --- Logo Positioned at Top Left --- */}
  <div className="absolute top-15 left-12 z-40">
    <Link href="/" className="inline-block">
      <img src="/Logo/GYMION White logo.png" alt="Gymion Logo" className="h-12" />
    </Link>
  </div>

  {/* Background Effects */}
  <div className="absolute inset-0 bg-[#080810]/40 z-10 backdrop-blur-[2px]"></div>
  <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-[#7C3AED]/20 rounded-full blur-[100px] z-20 pointer-events-none"></div>
  <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[100px] z-20 pointer-events-none"></div>

  <img
    src="/Fitness Photos/strong-man-training-gym.jpg"
    alt="Gym Background"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
  />

  {/* Bottom Content */}
  <div className="relative z-30 flex flex-col justify-end p-16 w-full h-full">
    <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 w-max mb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
      <span className="text-[11px] font-bold text-[#A78BFA] tracking-wider uppercase">Gymion Access</span>
    </div>
    <h2 className="text-5xl font-extrabold text-[#EEEDF8] max-w-lg leading-[1.1] tracking-[-1.5px] mb-4">
      Less chaos.<br />
      <span className="bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#67E8F9] text-transparent bg-clip-text">More growth.</span>
    </h2>
    <p className="text-[#9D9CB5] text-lg max-w-md">Your fitness journey starts here.</p>
  </div>
</div>

        {/* Right panel (Form) */}
        <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
          <div className="absolute top-[-220px] left-[-120px] w-[650px] h-[550px] bg-[#7C3AED]/10 rounded-full blur-[110px] pointer-events-none lg:hidden"></div>

          <div className="w-full max-w-[420px] relative z-10">
            {/* Logo & Header */}
            <div className="mb-10 lg:text-left text-center">
              <Link href="/" className="inline-block">
      <img src="/Logo/GYMION White logo.png" alt="Gymion Logo" className="h-9 mb-8 lg:hidden" />
    </Link>
              <h1 className="text-3xl font-extrabold tracking-[-1px] mb-3">Welcome back</h1>
              <p className="text-[#9D9CB5] text-[15px]">Login to manage your gym or continue your fitness journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Unified Identifier Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier" className="text-[13px] font-semibold text-[#9D9CB5]">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  required
                  placeholder="Enter email or phone number"
                  className="w-full bg-[#12121F] border border-white/10 text-[#EEEDF8] rounded-[14px] px-4 py-3.5 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px]"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-[13px] font-semibold text-[#9D9CB5]">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[13px] font-semibold text-[#60A5FA] hover:text-[#A78BFA] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="w-full bg-[#12121F] border border-white/10 text-[#EEEDF8] rounded-[14px] px-4 py-3.5 pr-12 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 flex items-center text-[#6B6A80] hover:text-[#EEEDF8] transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] text-white font-bold py-3.5 rounded-[14px] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-3 cursor-pointer shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_32px_rgba(124,58,237,0.4)] hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Secondary Link */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-[14px] text-[#9D9CB5]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#EEEDF8] font-bold hover:text-[#60A5FA] transition-colors relative after:content-[''] after:inline-block after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#7C3AED] after:to-[#06B6D4] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:absolute after:left-0 after:-bottom-0.5">
                  Get started free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
