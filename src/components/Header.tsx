"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
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

        {/* 메인 헤더 영역 */}
        <div className="flex-1 px-4 py-4 flex items-center">
          {/* 추가 헤더 콘텐츠가 필요할 경우 여기에 */}
        </div>
      </div>
    </header>
  );
}
