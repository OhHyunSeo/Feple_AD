'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex">
        {/* 로고 영역 (사이드바 너비와 동일) */}
        <div className="w-64 px-6 py-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="LGU+ Logo"
              width={80}
              height={22}
              className="h-6 w-auto"
            />
            <span className="text-2xl font-bold text-white korean-heading header-white-text">
              Feple
            </span>
          </div>
        </div>

        {/* 메인 헤더 영역 */}
        <div className="flex-1 px-6 py-6">
          {/* 빈 공간 */}
        </div>
      </div>
    </header>
  )
} 