'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Award,
  Target
} from 'lucide-react'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: '대시보드' },
  { href: '/consultants', icon: Users, label: '상담사 관리' },
  { 
    href: '/evaluations', 
    icon: FileText, 
    label: '평가 관리',
    hasSubmenu: true,
    submenu: [
      { href: '/evaluations/performance', label: '성과 평가' },
      { href: '/competency', label: '역량 평가' }
    ]
  },
  { href: '/performance', icon: BarChart3, label: '상담 모니터링' },
  { href: '/schedule', icon: Calendar, label: '평가 일정' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // 현재 경로가 서브메뉴에 포함되어 있는지 확인
  const isSubmenuActive = (item: typeof menuItems[0]) => {
    return item.submenu && item.submenu.some((sub) => pathname === sub.href)
  }

  // 서브메뉴가 활성화된 경우 해당 메뉴를 자동으로 열어둠
  const shouldShowSubmenu = (href: string) => {
    const item = menuItems.find(item => item.href === href)
    return openSubmenu === href || (item && isSubmenuActive(item))
  }

  const handleSubmenuToggle = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href)
  }

  const handleMouseEnter = (href: string) => {
    if (menuItems.find(item => item.href === href)?.hasSubmenu) {
      setOpenSubmenu(href)
    }
  }

  const handleMouseLeave = () => {
    // 현재 서브메뉴가 활성화된 상태라면 닫지 않음
    const activeItem = menuItems.find(item => isSubmenuActive(item))
    if (!activeItem) {
      setOpenSubmenu(null)
    }
  }

  return (
    <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl flex flex-col fixed left-0 z-40" style={{ top: '96px', height: 'calc(100vh - 96px)' }}>
      {/* 메인 메뉴 */}
      <nav className="flex-1 p-4 border-r border-pink-200">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))
            const isSubmenuOpen = shouldShowSubmenu(item.href)
            
            return (
              <li key={item.href} className="relative">
                <div
                  onMouseEnter={() => handleMouseEnter(item.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.hasSubmenu ? '#' : item.href}
                    onClick={(e) => {
                      if (item.hasSubmenu) {
                        e.preventDefault()
                        handleSubmenuToggle(item.href)
                      }
                    }}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 korean-text ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg transform scale-105 sidebar-active-text'
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:scale-105'
                    }`}
                  >
                                          <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    {item.hasSubmenu && (
                      <div className="transition-transform duration-200">
                        {isSubmenuOpen ? (
                          <ChevronDown className={`h-4 w-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                        ) : (
                          <ChevronRight className={`h-4 w-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                        )}
                      </div>
                    )}
                  </Link>
                  
                  {/* 서브메뉴 */}
                  {item.hasSubmenu && isSubmenuOpen && (
                    <ul className="mt-2 ml-8 space-y-1 animate-slide-down">
                      {item.submenu?.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        return (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 korean-text text-sm ${
                                isSubActive
                                  ? 'bg-pink-100 font-medium submenu-active-text'
                                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                              }`}
                            >
                              {subItem.label === '성과 평가' ? (
                                <Award className="h-4 w-4 text-pink-500" />
                              ) : (
                                <Target className="h-4 w-4 text-purple-500" />
                              )}
                                <span>{subItem.label}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
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