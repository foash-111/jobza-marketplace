import { type NextRequest, NextResponse } from "next/server"

// Mock database function - replace with actual database integration
async function createJob(jobData: any) {
  // This would be replaced with actual database insertion
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...jobData,
    status: "published",
    applicationsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "jobType",
      "serviceType",
      "serviceLevel",
      "cycleType",
      "budgetMin",
      "budgetMax",
      "address",
      "city",
      "country",
      "startDate",
    ]

    for (const field of requiredFields) {
      if (!jobData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create job
    const job = await createJob(jobData)

    return NextResponse.json({
      success: true,
      job,
    })
  } catch (error) {
    console.error("Job creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get("serviceType")
    const location = searchParams.get("location")
    const jobType = searchParams.get("jobType")

    // Mock job data - replace with actual database query
    const jobs = [
      {
        id: "1",
        familyId: "family-1",
        title: "Weekly House Cleaning",
        description: "Looking for a reliable housekeeper to clean our 3-bedroom home weekly.",
        jobType: "long-term",
        serviceType: "housekeeping",
        serviceLevel: "standard",
        cycleType: "weekly",
        requiredTasks: ["Vacuuming", "Bathroom cleaning", "Kitchen cleaning"],
        budget: { min: 50, max: 80, currency: "USD" },
        city: "Dubai",
        country: "UAE",
        startDate: new Date("2024-02-01"),
        urgencyLevel: "medium",
        applicationsCount: 3,
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Apply filters (in real implementation, this would be done in the database query)
    let filteredJobs = jobs
    if (serviceType && serviceType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.serviceType === serviceType)
    }
    if (location && location !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.city.toLowerCase() === location.toLowerCase())
    }
    if (jobType && jobType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.jobType === jobType)
    }

    return NextResponse.json({
      success: true,
      jobs: filteredJobs,
      total: filteredJobs.length,
    })
  } catch (error) {
    console.error("Job listing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
