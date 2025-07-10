"use client";

import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar, 
  Target,
  Settings,
  Bell,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "대시보드",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "상담사 관리",
    icon: Users,
    href: "/consultants",
  },
  {
    title: "평가 관리",
    icon: FileText,
    href: "/evaluations",
  },
  {
    title: "역량 진단",
    icon: Target,
    href: "/competency",
  },
  {
    title: "성과 분석",
    icon: BarChart3,
    href: "/performance",
  },
  {
    title: "평가 일정",
    icon: Calendar,
    href: "/schedule",
  },
];

const bottomMenuItems = [
  {
    title: "알림",
    icon: Bell,
    href: "/notifications",
  },
  {
    title: "설정",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "도움말",
    icon: HelpCircle,
    href: "/help",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">HR Dashboard</h1>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            관
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">관리자</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 