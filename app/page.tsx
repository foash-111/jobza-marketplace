import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Home, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">J</span>
            </div>
            <span className="text-3xl font-bold text-foreground">Jobza</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Domestic Worker Marketplace</h1>
          <p className="text-muted-foreground">Choose your dashboard to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <Link href="/worker/dashboard">
              <CardHeader className="text-center pb-4">
                <Users className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Worker Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Find jobs, manage applications, and connect with agencies</p>
                <Button className="w-full">Enter Worker Dashboard</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <Link href="/agency/dashboard">
              <CardHeader className="text-center pb-4">
                <Building2 className="h-16 w-16 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Agency Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Manage workers, handle job requests, and grow your agency</p>
                <Button className="w-full" variant="secondary">
                  Enter Agency Dashboard
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <Link href="/employer/dashboard">
              <CardHeader className="text-center pb-4">
                <Home className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Families Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Post jobs, review applications, and manage your household help
                </p>
                <Button className="w-full">Enter Families Dashboard</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <Link href="/admin/dashboard">
              <CardHeader className="text-center pb-4">
                <Shield className="h-16 w-16 text-destructive mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Verify users, manage platform, and oversee operations</p>
                <Button className="w-full" variant="destructive">
                  Enter Admin Dashboard
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
