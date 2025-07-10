'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Target, 
  BarChart3, 
  Calendar,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: '대시보드' },
  { href: '/consultants', icon: Users, label: '상담사 관리' },
  { href: '/evaluations', icon: FileText, label: '평가 관리' },
  { href: '/competency', icon: Target, label: '역량 진단' },
  { href: '/performance', icon: BarChart3, label: '성과 분석' },
  { href: '/schedule', icon: Calendar, label: '평가 일정' },
]

const bottomMenuItems = [
  { href: '/notifications', icon: Bell, label: '알림' },
  { href: '/settings', icon: Settings, label: '설정' },
  { href: '/help', icon: HelpCircle, label: '도움말' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white/90 backdrop-blur-sm border-r border-pink-200 shadow-xl flex flex-col">
      {/* 로고 영역 */}
      <div className="p-6 border-b border-pink-200">
        <div className="flex items-center gap-3">
          <div className="theme-gradient w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl korean-heading">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
              Feple
            </h1>
            <p className="text-sm text-pink-600 korean-text">대시보드</p>
          </div>
        </div>
      </div>

      {/* 메인 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 korean-text ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:scale-105'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 하단 메뉴 */}
      <div className="p-4 border-t border-pink-200">
        <ul className="space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 korean-text ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 사용자 정보 */}
      <div className="p-4 border-t border-pink-200">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm korean-text">관</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 korean-text">관리자</p>
            <p className="text-xs text-pink-600 korean-text">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  )
} 