'use client'

import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(80) // 기본값: 축소 상태

  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width)
  }

  return (
    <div className="h-screen overflow-hidden bg-white">
      <Header />
      <Sidebar onWidthChange={handleSidebarWidthChange} />
      <main 
        className="korean-text overflow-y-auto text-gray-900 transition-all duration-300 ease-in-out" 
        style={{ 
          marginLeft: `${sidebarWidth}px`, 
          marginTop: '96px', 
          height: 'calc(100vh - 96px)' 
        }}
      >
        <div className="p-6">
          <div className="max-w-7xl mx-auto text-gray-900">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
} 