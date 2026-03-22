"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "@/lib/utils";

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

type Role = "member" | "trainer" | "owner";

const roleDescriptions: Record<Role, string> = {
  member: "I want to train, book classes, and track my fitness.",
  trainer: "I want to manage clients, workouts, and my schedule.",
  owner: "I want to manage my gym facility, staff, and members.",
};

const roleLabels: Record<Role, string> = {
  member: "Member",
  trainer: "Trainer",
  owner: "Gym Owner",
};

const dashboardRoutes: Record<Role, string> = {
  member: "/member",
  trainer: "/trainer",
  owner: "/owner",
};

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role>("member");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const goToStep2 = () => {
    setStep(2);
  };

  const goToStep1 = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get("firstName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    const newErrors: Record<string, string> = {};

    if (!firstName) newErrors.firstName = "First name is required";

    const phoneRegex = /^[0-9+\-\s()]{5,20}$/;
    if (!phone || !phoneRegex.test(phone)) newErrors.phone = "Phone number is required";

    if (email) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email format";
    }

    if (!password || password.length < 6) newErrors.password = "Password is required (min 6 chars)";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const payload = {
      firstName,
      lastName: formData.get("lastName") as string,
      phoneNumber: phone,
      email,
      password,
      role: selectedRole
    };

    axios
      .post(`${server}/api/v1/auth/register`, payload)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Account created successfully!", { duration: 1000, icon: "🎉" });
          if (response.data) {
            const data = response.data.data;
            const userRole = data.role ? data.role.toLowerCase() : selectedRole;
            localStorage.setItem("role", userRole);
            if (data.tokens?.accessToken) {
              localStorage.setItem("jwt", data.tokens.accessToken);
            }
            
            // Set cookies for middleware
            setCookie("role", userRole);
            if (data.tokens?.accessToken) {
              setCookie("jwt", data.tokens.accessToken);
            }

            if (data.profile) {
              localStorage.setItem("firstName", data.profile.firstName);
            }
            setTimeout(() => {
              router.push(dashboardRoutes[selectedRole]);
            }, 1000);
          }
        } else {
          toast.error(response.data.message || "Signup failed. Please try again.");
          setLoading(false);
        }
      })
      .catch((error) => {
        let message = "Signup failed. Please try again.";
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
        setLoading(false);
      });
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
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
      <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-12 lg:p-16 relative h-screen overflow-y-auto overflow-x-hidden pb-20">
        <div className="absolute top-[-220px] left-[-120px] w-[650px] h-[550px] bg-[#7C3AED]/10 rounded-full blur-[110px] pointer-events-none lg:hidden z-0"></div>

        <div className="w-full max-w-[420px] relative z-10 m-auto mt-8 lg:mt-auto">
          {/* Logo & Header */}
          <div className="mb-10 lg:text-left text-center">
            <Link href="/" className="inline-block">
      <img src="/Logo/GYMION White logo.png" alt="Gymion Logo" className="h-9 mb-8 lg:hidden" />
    </Link>
            <h1 className="text-3xl font-extrabold tracking-[-1px] mb-3">
              {step === 1 ? "Join Gymion" : "Create Account"}
            </h1>
            <p className="text-[#9D9CB5] text-[15px]">
              {step === 1 ? "Select your role to get started" : "Enter your details to get started"}
            </p>
          </div>

          {/* Step 1: Role Selection */}
          <div
            className={`transition-all duration-300 ${step === 1 ? "block" : "hidden"}`}
            style={{ opacity: step === 1 ? 1 : 0 }}
          >
            <div className="flex flex-col gap-4">
              {(Object.keys(roleDescriptions) as Role[]).map((role) => (
                <label key={role} className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => setSelectedRole(role)}
                    className="peer sr-only"
                  />
                  <div className={`w-full p-5 bg-[#12121F] border rounded-[14px] transition-all hover:border-white/20 ${
                    selectedRole === role
                      ? "border-[#7C3AED] bg-[#7C3AED]/10"
                      : "border-white/10"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold mb-1">{roleLabels[role]}</h3>
                        <p className="text-[#9D9CB5] text-[13px]">{roleDescriptions[role]}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        selectedRole === role ? "border-[#7C3AED]" : "border-white/30 group-hover:border-white/60"
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#7C3AED] transition-opacity ${
                          selectedRole === role ? "opacity-100" : "opacity-0"
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={goToStep2}
              className="w-full mt-8 bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] text-white font-bold py-3.5 rounded-[14px] transition-all flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_32px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          {/* Step 2: Registration Form */}
          <div
            className={`transition-opacity duration-300 ${step === 2 ? "block opacity-100" : "hidden opacity-0"}`}
          >
            {/* Role summary banner */}
            <div className="flex items-center justify-between bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
                </div>
                <div>
                  <p className="text-[11px] text-[#9D9CB5] font-semibold uppercase tracking-wider leading-tight">Signing up as</p>
                  <p className="text-white font-bold capitalize leading-tight">{roleLabels[selectedRole]}</p>
                </div>
              </div>
              <button onClick={goToStep1} className="text-[13px] text-[#A78BFA] hover:text-white transition-colors font-medium underline underline-offset-2 cursor-pointer">Change</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-4">
                {/* First Name */}
                <div className="flex-1 flex flex-col gap-2 relative">
                  <label htmlFor="firstName" className="text-[13px] font-semibold text-[#9D9CB5]">First Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    onInput={() => clearError("firstName")}
                    className={`w-full bg-[#12121F] border text-[#EEEDF8] rounded-[14px] px-4 py-3.5 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px] ${errors.firstName ? "border-red-400" : "border-white/10"}`}
                    autoCorrect="off"
                    autoComplete="given-name"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-0.5">{errors.firstName}</p>}
                </div>
                {/* Last Name */}
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[13px] font-semibold text-[#9D9CB5]">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full bg-[#12121F] border border-white/10 text-[#EEEDF8] rounded-[14px] px-4 py-3.5 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px]"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="phone" className="text-[13px] font-semibold text-[#9D9CB5]">Phone Number <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  onInput={() => clearError("phone")}
                  className={`w-full bg-[#12121F] border text-[#EEEDF8] rounded-[14px] px-4 py-3.5 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px] ${errors.phone ? "border-red-400" : "border-white/10"}`}
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-0.5">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <label htmlFor="email" className="text-[13px] font-semibold text-[#9D9CB5]">Email Address</label>
                  <span className="text-[11px] text-[#6B6A80]">Optional</span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  onInput={() => clearError("email")}
                  className={`w-full bg-[#12121F] border text-[#EEEDF8] rounded-[14px] px-4 py-3.5 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px] ${errors.email ? "border-red-400" : "border-white/10"}`}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="password" className="text-[13px] font-semibold text-[#9D9CB5]">Password <span className="text-red-400">*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    onInput={() => clearError("password")}
                    className={`w-full bg-[#12121F] border text-[#EEEDF8] rounded-[14px] px-4 py-3.5 pr-12 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all placeholder:text-[#6B6A80] text-[15px] ${errors.password ? "border-red-400" : "border-white/10"}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 flex items-center text-[#6B6A80] hover:text-[#EEEDF8] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] text-white font-bold py-3.5 rounded-[14px] transition-all flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_32px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 relative group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Secondary Link */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-[14px] text-[#9D9CB5]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#EEEDF8] font-bold hover:text-[#60A5FA] transition-colors relative after:content-[''] after:inline-block after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#7C3AED] after:to-[#06B6D4] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:absolute after:left-0 after:-bottom-0.5">
                Log in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
