"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ArrowLeft, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

interface SharedHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
}

export function SharedHeader({ 
  title, 
  subtitle, 
  showBackButton = false
}: SharedHeaderProps) {
  const router = useRouter()

  return (
    <div className="bg-card border-b border-border -mx-6 -mt-6 px-6 py-4 mb-6 relative z-30">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </Badge>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
