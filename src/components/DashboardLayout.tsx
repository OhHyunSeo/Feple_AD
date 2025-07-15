'use client'

import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { AnalysisResultProvider } from '@/context/AnalysisResultContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(80) // 기본값: 축소 상태

  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width)
  }

  return (
    <AnalysisResultProvider>
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
          <div className="h-full w-full p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="h-full w-full text-gray-900">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AnalysisResultProvider>
  )
} 