"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  MapPin, 
  Star, 
  Clock, 
  Building2,
  UserPlus,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Award,
  Languages,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Eye
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SharedHeader } from "@/components/layout/shared-header"

interface Worker {
  id: number
  name: string
  specialization: string
  rating: number
  experience: number
  location: string
  availability: string
  nationality: string
  passport: string
  skills: string[]
  matchScore: number
  isAffiliated: boolean
  affiliatedDate?: string
  affiliationStatus: 'none' | 'pending' | 'accepted' | 'rejected'
  affiliationRequestDate?: string
  phone: string
  email: string
  languages: string[]
  certifications: string[]
  expectedSalary: string
  preferredLocation: string
  workType: 'live-in' | 'live-out' | 'both'
  startDate: string
  bio?: string
  references?: string[]
  previousEmployers?: Array<{
    name: string
    position: string
    duration: string
    feedback: string
  }>
}

function WorkerProfilePageContent() {
  const params = useParams()
  const router = useRouter()
  const [worker, setWorker] = useState<Worker | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Mock data - in real app, fetch from API based on params.id
    const mockWorker: Worker = {
      id: parseInt(params.id as string),
      name: "Sarah Johnson",
      specialization: "Elderly Care",
      rating: 4.6,
      experience: 5,
      location: "Abu Dhabi",
      availability: "Available",
      nationality: "British",
      passport: "B11223344",
      skills: ["Elderly care", "Medication management", "Mobility assistance", "Companionship", "First aid", "CPR"],
      matchScore: 82,
      isAffiliated: false,
      affiliationStatus: 'none',
      phone: "+971 50 555 1234",
      email: "sarah.johnson@email.com",
      languages: ["English", "French"],
      certifications: ["Nursing Assistant", "Geriatric Care", "Medication Administration", "First Aid", "CPR"],
      expectedSalary: "$2000/month",
      preferredLocation: "Abu Dhabi, Dubai",
      workType: "live-in",
      startDate: "2024-02-15",
      bio: "Experienced elderly care professional with 5 years of dedicated service. Specialized in providing compassionate care for seniors, managing medications, and ensuring their comfort and safety. Passionate about improving the quality of life for elderly clients.",
      references: [
        "Dr. Ahmed Al-Mansouri - Geriatric Specialist (+971 50 111 2222)",
        "Mrs. Emily Thompson - Previous Client (+971 50 333 4444)",
        "Care Home Manager - Golden Years Facility (+971 50 555 6666)"
      ],
      previousEmployers: [
        {
          name: "Thompson Family",
          position: "Live-in Caregiver",
          duration: "2 years (2022-2024)",
          feedback: "Excellent caregiver, very professional and caring. Highly recommend."
        },
        {
          name: "Golden Years Care Home",
          position: "Senior Care Assistant",
          duration: "3 years (2019-2022)",
          feedback: "Reliable and compassionate. Great team player."
        }
      ]
    }

    setWorker(mockWorker)
    setLoading(false)
  }, [params.id])

  const handleAffiliateWorker = () => {
    if (worker) {
      setWorker(prev => prev ? {
        ...prev,
        affiliationStatus: 'pending',
        affiliationRequestDate: new Date().toISOString().split('T')[0]
      } : null)
    }
  }

  const handleBackToWorkers = () => {
    router.push('/agency/workers')
  }

  if (loading) {
    return (
      <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading worker profile...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!worker) {
    return (
      <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Worker not found</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
      <div className="space-y-6">
        <SharedHeader 
          title="Worker Profile" 
          subtitle={`${worker.name} - ${worker.specialization}`}
          showBackButton={true}
          onBackClick={handleBackToWorkers}
        />

        {/* Worker Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{worker.name.charAt(0)}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <h1 className="text-2xl font-bold">{worker.name}</h1>
                    <p className="text-lg text-muted-foreground">{worker.specialization}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>⭐ {worker.rating} • {worker.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{worker.nationality}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={worker.availability === "Available" ? "default" : "secondary"}>
                      {worker.availability}
                    </Badge>
                    {worker.affiliationStatus === 'pending' && (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Affiliation Pending
                      </Badge>
                    )}
                    {worker.affiliationStatus === 'accepted' && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Affiliated
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Expected Salary</p>
                  <p className="text-xl font-bold text-primary">{worker.expectedSalary}</p>
                </div>
                
                {worker.affiliationStatus === 'none' && (
                  <Button onClick={handleAffiliateWorker} className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Send Affiliation Request
                  </Button>
                )}
                
                {worker.affiliationStatus === 'pending' && (
                  <Button variant="secondary" disabled className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    Affiliation Pending
                  </Button>
                )}
                
                {worker.affiliationStatus === 'accepted' && (
                  <Button variant="outline" className="w-full">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Already Affiliated
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Worker Details Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="contact">Contact & Documents</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Work Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Work Type</p>
                            <p className="font-medium capitalize">{worker.workType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{worker.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Preferred Location</p>
                            <p className="font-medium">{worker.preferredLocation}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Expected Salary</p>
                            <p className="font-medium">{worker.expectedSalary}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Languages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {worker.languages.map((language, index) => (
                            <Badge key={index} variant="secondary">
                              <Languages className="h-3 w-3 mr-1" />
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Match Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">{worker.matchScore}%</div>
                          <p className="text-sm text-muted-foreground">Compatibility with your agency</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Skills & Certifications Tab */}
              <TabsContent value="skills" className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {worker.skills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {worker.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Previous Employment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {worker.previousEmployers?.map((employer, index) => (
                          <div key={index} className="border-l-4 border-primary pl-4 py-2">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{employer.name}</h4>
                                <p className="text-sm text-muted-foreground">{employer.position}</p>
                                <p className="text-xs text-muted-foreground">{employer.duration}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{employer.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>References</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {worker.references?.map((reference, index) => (
                          <div key={index} className="p-3 bg-muted/30 rounded">
                            <p className="text-sm">{reference}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Contact & Documents Tab */}
              <TabsContent value="contact" className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>Passport: {worker.passport}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download CV/Resume
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="h-4 w-4 mr-2" />
                          View Passport Copy
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="h-4 w-4 mr-2" />
                          View Certificates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function WorkerProfilePage() {
  return (
    <Suspense fallback={
      <DashboardLayout userRole="agency" userName="Elite Home Services" userEmail="admin@elitehomeservices.com">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading worker profile...</p>
          </div>
        </div>
      </DashboardLayout>
    }>
      <WorkerProfilePageContent />
    </Suspense>
  )
}
