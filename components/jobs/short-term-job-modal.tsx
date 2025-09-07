"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Users,
  CheckCircle,
  X
} from "lucide-react"

interface ShortTermJobModalProps {
  job?: {
    id: number
    title: string
    family: string
    location: string
    salary: string
    duration: string
    startDate: string
    description: string
    requirements: string[]
  }
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isOpen?: boolean
  onClose?: () => void
}

export function ShortTermJobModal({ job, isOpen, onClose, open, onOpenChange }: ShortTermJobModalProps) {
  // Handle both prop patterns for compatibility
  const isModalOpen = isOpen ?? open ?? false
  const handleClose = onClose ?? (() => onOpenChange?.(false))
  
  // If no job data, show a placeholder or return null
  if (!job) {
        return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground flex items-center justify-between">
              <span>Job Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-gray-500">
            <p>No job details available</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground flex items-center justify-between">
            <span>{job.title}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-700">{job.family}</span>
                <Badge variant="secondary" className="ml-auto">Short Term</Badge>
              </div>
              
              <p className="text-gray-700 text-lg mb-4">{job.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">{job.duration}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">Start: {job.startDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-green-800">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              Apply Now
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
