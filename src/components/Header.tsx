'use client'

import { Bell, Search } from 'lucide-react'

interface HeaderProps {
  title?: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 border-b border-pink-300 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl korean-heading">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white korean-heading">
                HR Dashboard
              </h1>
              {title && (
                <p className="text-pink-100 font-medium korean-text">{title}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-200 h-4 w-4" />
              <input
                type="text"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 border border-pink-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/20 backdrop-blur-sm placeholder-pink-200 text-white korean-text"
              />
            </div>

            {/* 알림 */}
            <button className="relative p-2 text-white hover:bg-white/20 rounded-xl transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-400 rounded-full"></span>
            </button>

            {/* 사용자 */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white korean-text">관리자</p>
                <p className="text-xs text-pink-200 korean-text">admin@company.com</p>
              </div>
              <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20">
                <span className="text-white font-semibold text-sm korean-text">N</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 