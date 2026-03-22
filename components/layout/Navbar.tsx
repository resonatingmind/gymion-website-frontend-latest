"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { type UserRole, ROLE_LABELS } from "@/lib/nav-config";
import { MemberSearch } from "./MemberSearch";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface NavbarProps {
  role: UserRole;
  userName: string;
  userPhoto?: string | null;
  notificationCount?: number;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function Navbar({ role, userName, userPhoto, notificationCount = 0, mobileOpen, onToggleMobile }: NavbarProps) {
  const [greeting, setGreeting] = useState("Hello");
  const [dateString, setDateString] = useState("");
  const [logoError, setLogoError] = useState(false);

  const name = userName.split(" ")[0];

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      let newGreeting = "Hello";
      if (hour >= 5 && hour < 12) newGreeting = "Good morning";
      else if (hour >= 12 && hour < 17) newGreeting = "Good afternoon";
      else if (hour >= 17 && hour < 21) newGreeting = "Good evening";
      else newGreeting = "Good night";

      setGreeting(`${newGreeting}, ${name}`);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);

      setDateString(formattedDate);
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 60000);
    return () => clearInterval(interval);
  }, [name]);

  const displayCount = notificationCount > 9 ? "9+" : notificationCount;

  return (
    <header className="relative flex h-16 w-full items-center gap-4 border-b border-gray-100 bg-white px-4 md:px-6 shrink-0 z-20">

      {/* ── Mobile Left: Gymion Logo → links to home ──────────────────── */}
      <div className="flex md:hidden items-center shrink-0">
        <Link href="/">
          {!logoError ? (
            <Image
              src="/Logo/GYMION black logo.png"
              alt="Gymion Logo"
              width={100}
              height={28}
              className="object-contain"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <span className="text-lg font-bold tracking-wider text-gray-900">
              GYM<span className="text-violet-600">ION</span>
            </span>
          )}
        </Link>
      </div>

      {/* ── Desktop Left: Greeting & Date ─────────────────────────────── */}
      <div className="hidden md:flex flex-col shrink-0">
        <h2 className="text-sm font-medium text-gray-900">{greeting}</h2>
        <p className="text-xs text-gray-400">{dateString}</p>
      </div>

      {/* ── Center: always-present flex-1 spacer; search visible at lg+ (owner only) ── */}
      <div className="flex flex-1 items-center justify-center">
        {(role === "owner" || role==="trainer") && (
          <div className="hidden lg:block w-full max-w-[420px]">
            <MemberSearch variant="desktop" className="w-full max-w-none" />
          </div>
        )}
      </div>

      {/* ── Right: Search icon (< lg), Bell, Profile, Hamburger (mobile) ── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Search icon — shown below lg where the bar is hidden (owner only) */}
        {(role === "owner" || role==="trainer") && <MemberSearch variant="mobile" className="lg:hidden" />}

        {/* Notification bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white tracking-tighter">
              {displayCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profile → links to account page */}
        <Link
          href={`/${role}/account`}
          className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-gray-50 transition-colors"
        >
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-semibold text-gray-900">{userName}</span>
            <span className="text-xs font-medium text-gray-500">{ROLE_LABELS[role]}</span>
          </div>
          <UserAvatar name={userName} photoUrl={userPhoto} size={36} theme="violet" />
        </Link>

        {/* Mobile: Hamburger */}
        <button
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={onToggleMobile}
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
