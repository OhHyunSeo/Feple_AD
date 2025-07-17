"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AnalysisResultProvider } from "@/context/AnalysisResultContext";
import { useSidebar } from "@/context/SidebarContext";

interface DashboardLayoutProps {
  children: ReactNode;
  onPeriodChange?: (period: "yesterday" | "lastWeek" | "lastMonth") => void;
  selectedPeriod?: "yesterday" | "lastWeek" | "lastMonth";
}

export default function DashboardLayout({
  children,
  onPeriodChange,
  selectedPeriod,
}: DashboardLayoutProps) {
  const { sidebarWidth } = useSidebar();

  return (
    <AnalysisResultProvider>
      <div className="h-screen overflow-hidden bg-white">
        <Header
          onPeriodChange={onPeriodChange}
          selectedPeriod={selectedPeriod}
        />
        <Sidebar />
        <main
          className="korean-text overflow-y-auto transition-all duration-300 ease-in-out"
          style={{
            marginLeft: `${sidebarWidth}px`,
            marginTop: "80px", // 헤더 높이에 맞춰 조정
            height: "calc(100vh - 80px)",
          }}
        >
          <div className="h-full w-full">
            <div className="h-full w-full">{children}</div>
          </div>
        </main>
      </div>
    </AnalysisResultProvider>
  );
}
