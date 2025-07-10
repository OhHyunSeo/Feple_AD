'use client'

import { Bell, Search } from 'lucide-react'

interface HeaderProps {
  title?: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="theme-gradient w-10 h-10 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg korean-heading">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
                HR Dashboard
              </h1>
              {title && (
                <p className="text-pink-600 font-medium korean-text">{title}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4" />
              <input
                type="text"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 backdrop-blur-sm korean-text"
              />
            </div>

            {/* 알림 */}
            <button className="relative p-2 text-pink-600 hover:bg-pink-100 rounded-xl transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* 사용자 */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 korean-text">관리자</p>
                <p className="text-xs text-pink-600 korean-text">admin@company.com</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm korean-text">N</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 