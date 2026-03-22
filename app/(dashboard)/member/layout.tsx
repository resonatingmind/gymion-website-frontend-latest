import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// TODO: replace with real session
// e.g. const session = await getServerSession(authOptions)
const mockUser = {
  userName: "Mike Member",
  role: "member" as const,
  notificationCount: 5,
};

export default function MemberLayout({ children }: { children: ReactNode }) {
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
