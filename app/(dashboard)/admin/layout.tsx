import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// TODO: replace with real session
// e.g. const session = await getServerSession(authOptions)
const mockUser = {
  userName: "Alice Admin",
  role: "admin" as const,
  notificationCount: 1,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      role={mockUser.role} 
      userName={mockUser.userName} 
      notificationCount={mockUser.notificationCount}
    >
      {children}
    </DashboardLayout>
  );
}
