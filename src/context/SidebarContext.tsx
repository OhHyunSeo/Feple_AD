"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isHovered: boolean;
  isMenuClicked: boolean;
  setIsHovered: (value: boolean) => void;
  setIsMenuClicked: (value: boolean) => void;
  shouldShowContent: boolean;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const shouldShowContent = isHovered || isMenuClicked;
  const sidebarWidth = shouldShowContent ? 256 : 70;

  const value = {
    isHovered,
    isMenuClicked,
    setIsHovered,
    setIsMenuClicked,
    shouldShowContent,
    sidebarWidth,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
