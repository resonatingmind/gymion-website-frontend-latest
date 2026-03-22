import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarCheck,
  CreditCard,
  Settings,
  LucideIcon
} from 'lucide-react';

export type UserRole = "owner" | "admin" | "trainer" | "member";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  trainer: "Trainer",
  member: "Member"
};

// Add more nav items here as you build out each role's pages
export const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  owner: [
    { label: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
    { label: "Members", href: "/dashboard/owner/members", icon: Users },
    { label: "Trainers", href: "/dashboard/owner/trainers", icon: Dumbbell },
    { label: "Attendance", href: "/dashboard/owner/attendance", icon: CalendarCheck },
    { label: "Payments", href: "/dashboard/owner/payments", icon: CreditCard },
    { label: "Gym Setup", href: "/dashboard/owner/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  ],
  trainer: [
    { label: "Dashboard", href: "/dashboard/trainer", icon: LayoutDashboard },
  ],
  member: [
    { label: "Dashboard", href: "/dashboard/member", icon: LayoutDashboard },
  ],
};
