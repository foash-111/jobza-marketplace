"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MapPin, Calendar, DollarSign, Clock, CheckCircle, ArrowLeft, UserPlus, Star, Building2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SharedHeader } from "@/components/layout/shared-header"
import { JobDetails } from "@/components/shared/JobDetails"
import { AssignedWorkersTab } from "@/components/shared/AssignedWorkersTab"
import { AssignWorkersModal } from "@/components/shared/AssignWorkersModal"

interface JobRequest {
  id: number
  familyName: string
  jobTitle: string
  location: string
  budget: string
  startDate: string
  endDate?: string
  workingHours: string
  requirements: string[]
  description: string
  familyDetails: {
    members: number
    children: number
    elderly: number
    pets: boolean
    houseSize: string
  }
  additionalInfo: {
    accommodation: boolean
    meals: boolean
    transportation: boolean
    benefits: string[]
  }
  status: string
}

interface AffiliatedWorker {
  id: number
  name: string
  specialization: string
  rating: number
  experience: number
  location: string
  availability: string
  skills: string[]
  matchScore: number
}

interface AssignedWorker {
  id: number
  name: string
  specialization: string
  rating: number
  experience: number
  status: 'pending' | 'short_list' | 'rejected' | 'accepted'
  assignedDate: string
  employerFeedback?: string
}

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [jobRequest, setJobRequest] = useState<JobRequest | null>(null)
  const [affiliatedWorkers, setAffiliatedWorkers] = useState<AffiliatedWorker[]>([])
  const [assignedWorkers, setAssignedWorkers] = useState<AssignedWorker[]>([])
  const [showWorkerAssignment, setShowWorkerAssignment] = useState(false)
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'pending')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Mock data - in real app, fetch from API using params.id
    const mockJobRequest: JobRequest = {
      id: parseInt(params.id as string) || 1,
      familyName: "Al-Ahmad Family",
      jobTitle: "Full-time Housekeeper",
      location: "Dubai Marina",
      budget: "$1500/month",
      startDate: "2024-02-01",
      workingHours: "8 hours/day, 6 days/week",
      requirements: [
        "5+ years experience in housekeeping",
        "Fluent in English and Arabic",
        "Excellent cooking skills",
        "Experience with large families",
        "Valid health certificate",
        "References from previous employers"
      ],
      description: "We are looking for a reliable and experienced full-time housekeeper for our 4-bedroom villa in Dubai Marina. The ideal candidate should be able to handle all household tasks including cleaning, laundry, cooking, and general organization. We have 2 children (ages 8 and 12) and prefer someone who is patient and caring.",
      familyDetails: {
        members: 4,
        children: 2,
        elderly: 0,
        pets: true,
        houseSize: "4-bedroom villa"
      },
      additionalInfo: {
        accommodation: true,
        meals: true,
        transportation: false,
        benefits: ["Health insurance", "Paid vacation", "Performance bonus"]
      },
      status: "pending"
    }

    const mockAffiliatedWorkers: AffiliatedWorker[] = [
      {
        id: 1,
        name: "Maria Garcia",
        specialization: "Housekeeping",
        rating: 4.7,
        experience: 6,
        location: "Dubai",
        availability: "Available",
        skills: ["Deep cleaning", "Laundry", "Cooking", "Organization", "Child care"],
        matchScore: 95
      },
      {
        id: 2,
        name: "Fatima Al-Zahra",
        specialization: "Housekeeping",
        rating: 4.9,
        experience: 8,
        location: "Dubai",
        availability: "Available",
        skills: ["Luxury home care", "Cooking", "Laundry", "Pet care", "Child care"],
        matchScore: 88
      },
      {
        id: 3,
        name: "Sarah Johnson",
        specialization: "Housekeeping",
        rating: 4.6,
        experience: 5,
        location: "Dubai",
        availability: "Available",
        skills: ["General cleaning", "Laundry", "Basic cooking", "Organization"],
        matchScore: 82
      }
    ]

    // Mock assigned workers data for ongoing requests
    const mockAssignedWorkers: AssignedWorker[] = [
      {
        id: 1001, // Use different ID range to avoid conflicts with affiliated workers
        name: "Maria Garcia",
        specialization: "Housekeeping",
        rating: 4.7,
        experience: 6,
        status: 'accepted',
        assignedDate: '2024-01-25',
        employerFeedback: 'Excellent candidate, very professional'
      },
      {
        id: 1002, // Use different ID range to avoid conflicts with affiliated workers
        name: "Fatima Al-Zahra",
        specialization: "Housekeeping",
        rating: 4.9,
        experience: 8,
        status: 'short_list',
        assignedDate: '2024-01-26',
        employerFeedback: 'Good candidate, considering for backup'
      }
    ]

    setJobRequest(mockJobRequest)
    setAffiliatedWorkers(mockAffiliatedWorkers)
    setAssignedWorkers(mockAssignedWorkers)
    setLoading(false)
  }, [params.id])

  const handleWorkerSelection = (workerId: number) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    )
  }

  const handleAssignWorkers = () => {
    // In real app, this would send the assignment to the backend
    console.log("Assigning workers:", selectedWorkers)
    
    // Add assigned workers to the assignedWorkers state
    const newlyAssignedWorkers = affiliatedWorkers.filter(worker => 
      selectedWorkers.includes(worker.id)
    ).map((worker, index) => ({
      ...worker,
      id: Date.now() + index, // Generate unique IDs to avoid conflicts
      status: 'pending' as const,
      assignedDate: new Date().toISOString().split('T')[0]
    }))
    
    setAssignedWorkers(prev => [...prev, ...newlyAssignedWorkers])
    
    // Show success message and switch to ongoing tab
    setShowWorkerAssignment(false)
    setSelectedWorkers([])
    setShowSuccessMessage(true)
    setActiveTab('ongoing')
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000)
    
    // In a real app, you would also update the backend and move the request to ongoing status
    // This would trigger the moveToOngoing function in the dashboard
  }

  if (loading) {
    return (
      <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!jobRequest) {
    return (
      <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Job request not found</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
      <div className="space-y-6">
        {/* Header */}
        <SharedHeader 
          title="Job Request Details" 
          subtitle={`${jobRequest.familyName} - ${jobRequest.jobTitle}`} 
        />

        {/* Tab Navigation */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center p-6 pb-0">
                <TabsList className="w-full max-w-md">
                  <TabsTrigger value="pending" className="text-sm font-medium flex-1">Job Details</TabsTrigger>
                  <TabsTrigger value="ongoing" className="text-sm font-medium flex-1">Assigned Workers</TabsTrigger>
                </TabsList>
              </div>

              {/* Job Details Tab */}
              <TabsContent value="pending" className="p-6">
                <JobDetails audience="agency" job={{
                  jobTitle: jobRequest.jobTitle,
                  familyName: jobRequest.familyName,
                  location: jobRequest.location,
                  budget: jobRequest.budget,
                  startDate: jobRequest.startDate,
                  workingHours: jobRequest.workingHours,
                  requirements: jobRequest.requirements,
                  description: jobRequest.description,
                  familyDetails: jobRequest.familyDetails,
                  additionalInfo: jobRequest.additionalInfo,
                  status: jobRequest.status,
                }} />
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Assign Workers</CardTitle>
                        <CardDescription>Select from your affiliated workers to assign to this job</CardDescription>
                      </div>
                      <Button onClick={() => setShowWorkerAssignment(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign Workers
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No workers assigned yet</p>
                      <p className="text-sm">Click "Assign Workers" to select from your affiliated workers</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assigned Workers Tab */}
              <TabsContent value="ongoing" className="p-6">
                <div className="space-y-6">
                  {showSuccessMessage && (
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-5 w-5" />
                          <p className="font-medium">Workers assigned successfully!</p>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          The request has moved to ongoing status. You can now track worker acceptance from employers.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  <AssignedWorkersTab 
                    assignedWorkers={assignedWorkers}
                    onProceedContract={(workerId) => router.push(`/contracts/create?familyId=${jobRequest.id}&workerId=${workerId}`)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={() => setShowWorkerAssignment(true)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign More Workers
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>



        <AssignWorkersModal 
          open={showWorkerAssignment}
          workers={affiliatedWorkers}
          selected={selectedWorkers}
          onToggleSelect={handleWorkerSelection}
          onClose={() => setShowWorkerAssignment(false)}
          onAssign={handleAssignWorkers}
        />
      </div>
    </DashboardLayout>
  )
}
