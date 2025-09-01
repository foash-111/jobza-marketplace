"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Briefcase, Users, Bell, Menu, LogOut, User, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  userName?: string
  userEmail?: string
  userAvatar?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  onClick?: () => void
}

const getNavigationItems = (role: UserRole): NavItem[] => {
  const baseItems: NavItem[] = [
    { title: "Dashboard", href: `/${role}/dashboard`, icon: Home },
    { title: "Profile", href: `/${role}/profile`, icon: User },
  ]

  switch (role) {
    case "family":
      return [
        ...baseItems.slice(0, 1),
        { title: "My Jobs", href: "/family/jobs", icon: Briefcase },
        { title: "Post Job", href: "/post-job", icon: Plus },
        { title: "Browse Workers", href: "/browse-workers", icon: Search },
        ...baseItems.slice(1),
      ]
    case "worker":
      return [
        ...baseItems.slice(0, 1),
        { title: "Find Jobs", href: "/browse-jobs", icon: Search },
        { title: "My Applications", href: "/worker/applications", icon: Briefcase },
        { title: "My Jobs", href: "/worker/jobs", icon: Briefcase },
        ...baseItems.slice(1),
      ]
    case "agency":
      return [
        ...baseItems.slice(0, 1),
        { title: "Workers", href: "/agency/workers", icon: Users },
        ...baseItems.slice(1),
        { title: "Logout", href: "#", icon: LogOut, onClick: () => handleSignOut() },
      ]
    case "admin":
      return [
        ...baseItems.slice(0, 1),
        { title: "Profile", href: "/admin/profile", icon: User },
        { title: "Logout", href: "#", icon: LogOut, onClick: () => handleSignOut() },
      ]
    default:
      return baseItems
  }
}

export function DashboardLayout({ children, userRole, userName, userEmail, userAvatar }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navigationItems = getNavigationItems(userRole)

  const handleSignOut = async () => {
    try {
      // Clear any stored user data
      localStorage.removeItem('user')
      localStorage.removeItem('userRole')
      localStorage.removeItem('token')
      
      // Redirect to home page
      window.location.href = "/"
    } catch (error) {
      console.error("Sign out error:", error)
      // Fallback redirect
      window.location.href = "/"
    }
  }

  const NavItems = ({ className }: { className?: string }) => (
    <nav className={cn("space-y-2", className)}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        const isLogout = item.title === "Logout"
        
        if (item.onClick) {
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isLogout 
                  ? "text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-transparent" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={() => {
                item.onClick?.()
                setIsMobileMenuOpen(false)
              }}
            >
              <item.icon className={cn("h-4 w-4", isLogout && "text-red-600")} />
              {item.title}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        }
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
            {item.badge && (
              <Badge variant="secondary" className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">J</span>
                </div>
                <span className="text-xl font-bold">Jobza</span>
              </div>
              <NavItems />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">Jobza</span>
          </Link>

          <div className="flex-1" />

          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                  <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${userRole}/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50">
          <div className="flex-1 p-6">
            <NavItems />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
