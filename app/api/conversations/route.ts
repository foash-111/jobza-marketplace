import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { participantId, jobId } = await request.json()

    if (!participantId) {
      return NextResponse.json({ error: "Participant ID is required" }, { status: 400 })
    }

    // Mock response for now
    const conversation = {
      id: Date.now().toString(),
      participants: [
        { id: "user-1", name: "Current User", role: "family" },
        { id: participantId, name: "Other User", role: "worker" },
      ],
      messages: [],
      createdAt: new Date(),
    }

    return NextResponse.json({ conversation }, { status: 201 })
  } catch (error) {
    console.error("Error creating conversation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
