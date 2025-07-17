"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onPeriodChange?: (period: "yesterday" | "lastWeek" | "lastMonth") => void;
  selectedPeriod?: "yesterday" | "lastWeek" | "lastMonth";
}

export default function Header({
  onPeriodChange,
  selectedPeriod = "yesterday",
}: HeaderProps) {
  const pathname = usePathname();
  const isConsultantDashboard = pathname === "/consultant";

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex h-20">
        {/* 로고 영역 (고정된 너비) */}
        <div className="w-64 px-4 py-4 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-2"
          >
            <Image
              src="/logo.svg"
              alt="LGU+ Logo"
              width={80}
              height={22}
              className="h-6 w-auto flex-shrink-0"
            />
            <span className="text-2xl mb-2 font-bold text-white korean-heading header-white-text leading-none">
              Feple
            </span>
          </Link>
        </div>

        {/* 중앙 영역 - 토글 버튼 */}
        <div className="flex-1 px-4 py-4 flex items-center justify-center">
          {/* 상담사 대시보드에서만 기간 토글 버튼 표시 */}
          {isConsultantDashboard && onPeriodChange && (
            <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1 gap-1">
              <button
                onClick={() => onPeriodChange("yesterday")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === "yesterday"
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                전일
              </button>
              <button
                onClick={() => onPeriodChange("lastWeek")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === "lastWeek"
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                저번 주
              </button>
              <button
                onClick={() => onPeriodChange("lastMonth")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === "lastMonth"
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                저번 달
              </button>
            </div>
          )}
        </div>

        {/* 오른쪽 빈 영역 (로고와 동일한 너비로 균형 맞춤) */}
        <div className="w-64"></div>
      </div>
    </header>
  );
}
