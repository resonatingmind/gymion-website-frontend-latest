import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// TODO: replace with real session
// e.g. const session = await getServerSession(authOptions)
const mockUser = {
  userName: "John Owner",
  role: "owner" as const,
  notificationCount: 3,
};

export default function OwnerLayout({ children }: { children: ReactNode }) {
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
