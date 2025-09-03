"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Star, CheckCircle, XCircle } from "lucide-react"

type Application = {
  id: number
  workerName: string
  workerAvatar?: string
  appliedDate: string
  status: string
  rating?: number
  experience?: string
  location?: string
  hourlyRate?: string
  skills: string[]
  languages: string[]
}

interface ApplicantsListProps {
  applications: Application[]
  onAction?: (applicationId: number, action: "accept" | "reject" | "short_list") => void
  getStatusBadgeClass?: (status: string) => string
  showViewProfileButton?: boolean
}

export function ApplicantsList({
  applications,
  onAction,
  getStatusBadgeClass = () => "",
  showViewProfileButton = true,
}: ApplicantsListProps) {
  const sortApplications = (apps: Application[]) => {
    const rank: Record<string, number> = {
      accepted: 0,
      short_list: 1,
      pending: 2,
      reviewed: 3,
      completed: 4,
      rejected: 5,
    }
    return [...apps].sort((a, b) => (rank[a.status] ?? 99) - (rank[b.status] ?? 99))
  }

  return (
    <div className="space-y-4">
      {sortApplications(applications).map((app) => (
        <div key={app.id} className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={app.workerAvatar} alt={app.workerName} />
                <AvatarFallback className="text-xl font-semibold">
                  {app.workerName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{app.workerName}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {typeof app.rating !== "undefined" && (
                    <>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{app.rating}</span>
                    </>
                  )}
                  {app.experience && (
                    <span className="text-gray-500">({app.experience} experience)</span>
                  )}
                </div>
                {app.location && (
                  <p className="text-sm text-gray-600 mt-1">{app.location}</p>
                )}
              </div>
            </div>
            <Badge className={getStatusBadgeClass(app.status)}>{app.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {app.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-1">
                {app.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">Applied: {app.appliedDate}</div>
            <div className="flex space-x-2">
              {showViewProfileButton && (
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              )}
              {onAction && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction(app.id, "short_list")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Short List
                </Button>
              )}
              {onAction && app.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => onAction(app.id, "accept")} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction(app.id, "reject")}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


