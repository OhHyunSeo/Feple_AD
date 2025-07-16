"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, Upload } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { setIsHovered, setIsMenuClicked, shouldShowContent, sidebarWidth } =
    useSidebar();

  // 현재 경로가 상담사용 대시보드인지 확인 (정확한 매칭)
  const isConsultantMode =
    pathname === "/consultant" || pathname.startsWith("/consultant/");

  // 역할에 따른 메뉴 아이템 설정
  const menuItems = isConsultantMode
    ? [
        { href: "/consultant", icon: LayoutDashboard, label: "대시보드" },
        {
          href: "/consultant/performance",
          icon: BarChart3,
          label: "상담 모니터링",
        },
        { href: "/consultant/upload", icon: Upload, label: "상담 파일 업로드" },
      ]
    : [
        { href: "/qc", icon: LayoutDashboard, label: "대시보드" },
        { href: "/consultants", icon: Users, label: "상담사 관리" },
        { href: "/qc/performance", icon: BarChart3, label: "상담 모니터링" },
      ];

  // 메뉴 클릭 핸들러
  const handleMenuClick = () => {
    // 이미 펼쳐진 상태에서 메뉴를 클릭했을 때만 일시적으로 펼친 상태 유지
    if (shouldShowContent) {
      setIsMenuClicked(true);
      // 페이지 전환 후 1.5초간 펼친 상태 유지
      setTimeout(() => {
        setIsMenuClicked(false);
      }, 1500);
    }
  };

  return (
    <div
      className="bg-white/90 backdrop-blur-sm shadow-xl flex flex-col fixed left-0 z-40 transition-all duration-300 ease-in-out"
      style={{
        top: "80px", // 헤더 높이에 맞춰 조정
        height: "calc(100vh - 80px)",
        width: `${sidebarWidth}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 메뉴 */}
      <nav className="flex-1 p-3 border-r border-pink-200">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 korean-text group relative ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg sidebar-active-text"
                      : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  tabIndex={0}
                  onClick={handleMenuClick}
                >
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      isActive ? "text-white" : "text-pink-500"
                    }`}
                  />

                  {/* 텍스트 - 확장 시에만 보임 */}
                  <span
                    className={`font-medium whitespace-nowrap transition-all duration-300 text-sm ${
                      shouldShowContent
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4 w-0 overflow-hidden"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* 툴팁 - 축소 시에만 보임 */}
                  {!shouldShowContent && (
                    <div className="sidebar-tooltip" data-tooltip={item.label}>
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 사용자 정보 */}
      <div className="p-3 border-t border-r border-pink-200 transition-all duration-300">
        <div
          className={`sidebar-user-info ${
            shouldShowContent
              ? "sidebar-user-info--expanded"
              : "sidebar-user-info--collapsed"
          }`}
        >
          <div className="sidebar-user-avatar">
            <span>{isConsultantMode ? "상" : "관"}</span>
          </div>
          {/* 사용자 정보 텍스트 - 확장 시에만 렌더링 */}
          {shouldShowContent && (
            <div className="transition-all duration-300 opacity-100 translate-x-0 flex-1 ml-2">
              <p className="text-xs font-medium text-gray-900 korean-text whitespace-nowrap">
                {isConsultantMode ? "상담사" : "관리자"}
              </p>
              <p className="text-xs text-pink-600 korean-text whitespace-nowrap">
                {isConsultantMode
                  ? "consultant@company.com"
                  : "admin@company.com"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
