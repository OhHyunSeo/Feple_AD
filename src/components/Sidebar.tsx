'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  BarChart3
} from 'lucide-react'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: '대시보드' },
  { href: '/consultants', icon: Users, label: '상담사 관리' },
  { href: '/performance', icon: BarChart3, label: '상담 모니터링' },
]

interface SidebarProps {
  onWidthChange?: (width: number) => void
}

export default function Sidebar({ onWidthChange }: SidebarProps) {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  const shouldShowContent = isHovered
  const sidebarWidth = shouldShowContent ? 256 : 80

  // 부모 컴포넌트에 너비 변경 알림
  useEffect(() => {
    onWidthChange?.(sidebarWidth)
  }, [sidebarWidth, onWidthChange])

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm shadow-xl flex flex-col fixed left-0 z-40 transition-all duration-300 ease-in-out"
      style={{ 
        top: '96px', 
        height: 'calc(100vh - 96px)',
        width: `${sidebarWidth}px`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


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
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 korean-text group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg sidebar-active-text'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                  
                  {/* 텍스트 - 확장 시에만 보임 */}
                  <span 
                    className={`font-medium whitespace-nowrap transition-all duration-300 ${
                      shouldShowContent 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4 w-0 overflow-hidden'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* 툴팁 - 축소 시에만 보임 */}
                  {!shouldShowContent && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 사용자 정보 */}
      <div className="p-4 border-t border-pink-200 border-r border-pink-200">
        <div className={`flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl transition-all duration-300 ${
          shouldShowContent ? 'flex-row' : 'flex-col'
        }`}>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm korean-text">관</span>
          </div>
          
          {/* 사용자 정보 텍스트 */}
          <div className={`transition-all duration-300 ${
            shouldShowContent 
              ? 'opacity-100 translate-x-0 flex-1' 
              : 'opacity-0 translate-x-4 w-0 overflow-hidden'
          }`}>
            <p className="text-sm font-medium text-gray-900 korean-text whitespace-nowrap">관리자</p>
            <p className="text-xs text-pink-600 korean-text whitespace-nowrap">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  )
} 