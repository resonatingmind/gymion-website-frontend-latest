"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { NAV_CONFIG, ROLE_LABELS, type UserRole } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: UserRole;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const pathname = usePathname();
  const navItems = NAV_CONFIG[role];
  const roleLabel = ROLE_LABELS[role];
  
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-[#0f1117] text-white transition-all duration-300 ease-in-out shrink-0",
      isCollapsed ? "w-[72px]" : "w-[220px]"
    )}>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[72px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e2130] border border-white/10 text-gray-400 hover:text-white"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header section with logo */}
      <div className="flex h-20 flex-col items-center justify-center border-b border-white/5 pt-4">
        <div className="flex items-center justify-center h-8">
           {!logoError ? (
             <Image 
               src={isCollapsed ? "/logo-icon.png" : "/logo.png"} 
               alt="Gymion Logo" 
               width={isCollapsed ? 32 : 120} 
               height={32} 
               className="object-contain" 
               onError={() => setLogoError(true)}
               priority
             />
           ) : (
             <div className="text-xl font-bold tracking-wider text-white flex items-center">
               {isCollapsed ? <span className="text-violet-500">G</span> : (
                 <>GYM<span className="text-violet-500">ION</span></>
               )}
             </div>
           )}
        </div>
        {!isCollapsed && (
          <div className="mt-1 text-[9px] uppercase tracking-widest bg-violet-600/20 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded-md">
            {roleLabel}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                 <Link 
                   href={item.href}
                   className={cn(
                     "flex items-center rounded-xl px-3 py-2.5 transition-colors group",
                     isActive 
                       ? "bg-violet-600 text-white" 
                       : "text-gray-400 opacity-60 hover:bg-white/5 hover:text-white hover:opacity-100",
                     isCollapsed ? "justify-center" : "gap-3"
                   )}
                   title={isCollapsed ? item.label : undefined}
                 >
                   <Icon size={20} className={cn("shrink-0", isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100")} />
                   {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                 </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User Section */}
      <div className="border-t border-white/5 p-4">
         <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-900/40 text-violet-300 font-bold text-sm">
               {initials}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                 <span className="truncate text-sm font-semibold text-white">{userName}</span>
                 <span className="truncate text-xs text-gray-400">{roleLabel}</span>
              </div>
            )}
         </div>
         <button 
           className={cn(
             "mt-4 flex items-center group text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400 rounded-xl px-3 py-2.5 w-full",
             isCollapsed ? "justify-center" : "gap-3"
           )}
           title={isCollapsed ? "Logout" : undefined}
         >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
         </button>
      </div>
    </div>
  );
}
