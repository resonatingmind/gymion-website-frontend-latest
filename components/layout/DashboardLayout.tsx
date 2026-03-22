"use client";

import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { type UserRole } from "@/lib/nav-config";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName: string;
  userPhoto?: string | null;
  notificationCount?: number;
}

export default function DashboardLayout({ children, role, userName, userPhoto, notificationCount = 0 }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar
        role={role}
        userName={userName}
        userPhoto={userPhoto}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          role={role}
          userName={userName}
          userPhoto={userPhoto}
          notificationCount={notificationCount}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
