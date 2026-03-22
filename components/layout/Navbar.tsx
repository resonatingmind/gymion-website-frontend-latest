"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Bell, Menu, X } from "lucide-react";
import { type UserRole, ROLE_LABELS } from "@/lib/nav-config";

interface NavbarProps {
  role: UserRole;
  userName: string;
  notificationCount?: number;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function Navbar({ role, userName, notificationCount = 0, mobileOpen, onToggleMobile }: NavbarProps) {
  const [greeting, setGreeting] = useState("Hello");
  const [dateString, setDateString] = useState("");
  const [logoError, setLogoError] = useState(false);

  const name = userName.split(" ")[0];

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

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
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-4 md:px-6 shrink-0 z-10">

      {/* ── Mobile Left: Gymion Logo ─────────────────────────────────── */}
      <div className="flex md:hidden items-center">
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
      </div>

      {/* ── Desktop Left: Greeting & Date ───────────────────────────── */}
      <div className="hidden md:flex flex-col">
        <h2 className="text-sm font-medium text-gray-900">{greeting}</h2>
        <p className="text-xs text-gray-400">{dateString}</p>
      </div>

      {/* ── Right: Notifications, Profile & Mobile Hamburger ────────── */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white tracking-tighter">
              {displayCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-semibold text-gray-900">{userName}</span>
            <span className="text-xs font-medium text-gray-500">{ROLE_LABELS[role]}</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
            {initials}
          </div>
        </div>

        {/* ── Mobile: Hamburger button ─────────────────────────────── */}
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
