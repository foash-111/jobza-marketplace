import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock response for now
    const conversations = [
      {
        id: "1",
        participants: [
          { id: "user-1", name: "Current User", role: "family" },
          { id: "2", name: "Maria Garcia", role: "worker" },
        ],
        lastMessage: {
          content: "Thank you for your interest in the position.",
          createdAt: new Date(),
          senderId: "user-1",
        },
        unreadCount: 0,
      },
    ]

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId, content, attachments } = await request.json()

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock response for now
    const message = {
      id: Date.now().toString(),
      senderId: "user-1",
      content,
      attachments: attachments || [],
      createdAt: new Date(),
    }

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
