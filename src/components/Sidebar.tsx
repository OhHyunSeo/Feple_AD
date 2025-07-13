'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BarChart3,
} from 'lucide-react'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: '대시보드' },
  { href: '/consultants', icon: Users, label: '상담사 관리' },
  { href: '/performance', icon: BarChart3, label: '상담 모니터링' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl flex flex-col fixed left-0 z-40" style={{ top: '96px', height: 'calc(100vh - 96px)' }}>
      {/* 메인 메뉴 */}
      <nav className="flex-1 p-4 border-r border-pink-200">
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
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg transform scale-105 sidebar-active-text'
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

      {/* 사용자 정보 */}
      <div className="p-4 border-t border-pink-200 border-r border-pink-200">
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