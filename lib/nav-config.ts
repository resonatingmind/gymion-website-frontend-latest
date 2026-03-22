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
  /** If true, only mark active on an exact pathname match (no sub-path matching) */
  exact?: boolean;
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
    { label: "Dashboard", href: "/owner", icon: LayoutDashboard, exact: true },
    { label: "Members", href: "/owner/members", icon: Users },
    { label: "Trainers", href: "/owner/trainers", icon: Dumbbell },
    { label: "Attendance", href: "/owner/attendance", icon: CalendarCheck },
    { label: "Payments", href: "/owner/payments", icon: CreditCard },
    { label: "Gym Setup", href: "/owner/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  ],
  trainer: [
    { label: "Dashboard", href: "/trainer", icon: LayoutDashboard, exact: true },
    { label: "My Members", href: "/trainer/members", icon: Users },
    { label: "Schedule", href: "/trainer/schedule", icon: CalendarCheck },
    { label: "Workouts", href: "/trainer/workouts", icon: Dumbbell },
    { label: "Settings", href: "/trainer/settings", icon: Settings },
  ],
  member: [
    { label: "Dashboard", href: "/member", icon: LayoutDashboard, exact: true },
    { label: "My Workouts", href: "/member/workouts", icon: Dumbbell },
    { label: "Attendance", href: "/member/attendance", icon: CalendarCheck },
    { label: "Payments", href: "/member/payments", icon: CreditCard },
    { label: "Settings", href: "/member/settings", icon: Settings },
  ],
};
