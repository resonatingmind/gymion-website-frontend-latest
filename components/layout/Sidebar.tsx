"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { NAV_CONFIG, ROLE_LABELS, type UserRole } from "@/lib/nav-config";
import { cn, deleteCookie } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface SidebarProps {
  role: UserRole;
  userName: string;
  userPhoto?: string | null;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ role, userName, userPhoto, mobileOpen, setMobileOpen }: SidebarProps) {
  // Desktop: hover-based expand/collapse
  const [isHovered, setIsHovered] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const navItems = NAV_CONFIG[role];
  const roleLabel = ROLE_LABELS[role];

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    localStorage.removeItem("firstName");
    
    // Clear cookies for middleware
    deleteCookie("role");
    deleteCookie("jwt");
    
    router.push("/login");
  };

  // Desktop sidebar is "expanded" when hovered
  const desktopExpanded = isHovered;

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 120);
  };

  // Shared nav content used in both desktop and mobile renderings
  const NavContent = ({ expanded }: { expanded: boolean }) => (
    <>
      {/* Header / Logo → links to home */}
      <div className="flex h-16 flex-col items-center justify-start border-b border-white/5 pt-4">
        <Link href="/" className="flex items-center justify-center h-8">
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
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
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
          {/* Expanded: avatar + name/role (clickable → account) + logout */}
          {expanded && (
            <div className="flex flex-1 items-center gap-3 overflow-hidden min-w-0">
              <Link
                href={`/${role}/account`}
                className="flex flex-1 items-center gap-3 overflow-hidden min-w-0 rounded-lg hover:bg-white/5 transition-colors"
              >
                <UserAvatar name={userName} photoUrl={userPhoto} size={36} theme="dark" />
                <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                  <span className="truncate text-sm font-semibold text-white">
                    {userName}
                  </span>
                  <span className="truncate text-xs text-gray-400">{roleLabel}</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="shrink-0 flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          {/* Collapsed: just logout icon */}
          {!expanded && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
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
      {/* ─── Mobile: Overlay backdrop ───────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─── Mobile: Slide-in Sidebar ───────────────────────────────── */}
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
