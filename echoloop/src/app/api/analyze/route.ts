import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call your local Python FastAPI server
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: body.text }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze emotions");
    }

    const mlData = await response.json();
    return NextResponse.json(mlData);

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze journal" }, { status: 500 });
  }
}