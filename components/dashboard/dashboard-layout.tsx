"use client"

import type React from "react"
import { useState } from "react"
import { UnifiedSidebar } from "@/components/layout/unified-sidebar"
import type { UserRole } from "@/lib/types"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function DashboardLayout({ children, userRole, userName, userEmail, userAvatar }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <UnifiedSidebar 
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 p-6 relative z-10 flex justify-center ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
