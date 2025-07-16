"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AnalysisResultProvider } from "@/context/AnalysisResultContext";
import { useSidebar } from "@/context/SidebarContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarWidth } = useSidebar();

  return (
    <AnalysisResultProvider>
      <div className="h-screen overflow-hidden bg-white">
        <Header />
        <Sidebar />
        <main
          className="korean-text overflow-y-auto text-gray-900 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: `${sidebarWidth}px`,
            marginTop: "80px", // 헤더 높이에 맞춰 조정
            height: "calc(100vh - 80px)",
          }}
        >
          <div className="h-full w-full">
            <div className="h-full w-full text-gray-900">{children}</div>
          </div>
        </main>
      </div>
    </AnalysisResultProvider>
  );
}
