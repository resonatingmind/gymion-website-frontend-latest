"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { NAV_CONFIG, ROLE_LABELS, type UserRole } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: UserRole;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  // Desktop: hover-based expand/collapse
  const [isHovered, setIsHovered] = useState(false);
  // Mobile: hamburger toggle
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const navItems = NAV_CONFIG[role];
  const roleLabel = ROLE_LABELS[role];

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Desktop sidebar is "expanded" when hovered
  const desktopExpanded = isHovered;

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Small delay so it doesn't collapse too aggressively
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 120);
  };

  // Shared nav content used in both desktop and mobile renderings
  const NavContent = ({ expanded }: { expanded: boolean }) => (
    <>
      {/* Header / Logo */}
      <div className="flex h-16 flex-col items-center justify-start border-b border-white/5 pt-4">
        <div className="flex items-center justify-center h-8">
          {!logoError ? (
            <Image
              src={expanded ? "/Logo/GYMION White logo.png" : "/Logo/Gymion Favicon.png"}
              alt="Gymion Logo"
              width={expanded ? 120 : 32}
              height={32}
              className="object-contain transition-all duration-300"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <div className="text-xl font-bold tracking-wider text-white flex items-center">
              {expanded ? (
                <>GYM<span className="text-violet-500">ION</span></>
              ) : (
                <span className="text-violet-500">G</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center rounded-xl px-3 py-2.5 transition-colors group",
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 opacity-60 hover:bg-white/5 hover:text-white hover:opacity-100",
                    expanded ? "gap-3" : "justify-center"
                  )}
                  title={!expanded ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "shrink-0",
                      isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                    )}
                  />
                  {expanded && (
                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User + Logout Section */}
      <div className="border-t border-white/5 p-4">
        <div
          className={cn(
            "flex items-center",
            expanded ? "gap-3" : "justify-center"
          )}
        >
          {/* Avatar */}
          

          {/* Name + Role + Logout inline */}
          {expanded && (
            <div className="flex flex-1 items-center justify-between overflow-hidden min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-900/40 text-violet-300 font-bold text-sm">
            {initials}
          </div>
              <div className="flex flex-col overflow-hidden min-w-0">
                <span className="truncate text-sm font-semibold text-white">
                  {userName}
                </span>
                <span className="truncate text-xs text-gray-400">{roleLabel}</span>
              </div>
              <button
                className="ml-2 shrink-0 flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          {/* Collapsed: just logout icon */}
          {!expanded && (
            <button
              className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ─── Mobile Hamburger Button ────────────────────────────────── */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f1117] border border-white/10 text-gray-300 hover:text-white transition-colors"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ─── Mobile: Overlay + Slide-in Sidebar ─────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 z-40 flex flex-col h-full w-[220px] bg-[#0f1117] text-white transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent expanded={true} />
      </div>

      {/* ─── Desktop: Hover-to-Expand Sidebar ───────────────────────── */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "hidden md:flex flex-col h-full bg-[#0f1117] text-white transition-all duration-300 ease-in-out shrink-0",
          desktopExpanded ? "w-[220px]" : "w-[72px]"
        )}
      >
        <NavContent expanded={desktopExpanded} />
      </div>
    </>
  );
}
