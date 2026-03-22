import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// TODO: replace with real session
// e.g. const session = await getServerSession(authOptions)
const mockUser = {
  userName: "Tom Trainer",
  role: "trainer" as const,
  notificationCount: 0,
};

export default function TrainerLayout({ children }: { children: ReactNode }) {
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
