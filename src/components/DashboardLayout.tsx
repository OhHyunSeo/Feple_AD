import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title={title} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 