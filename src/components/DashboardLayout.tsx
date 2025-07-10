'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar />
      <main className="korean-text overflow-y-auto text-gray-900" style={{ marginLeft: '256px', marginTop: '96px', height: 'calc(100vh - 96px)' }}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto text-gray-900">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
} 