import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the SDK. It automatically picks up process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // We use gemini-2.5-flash as it is blazing fast for real-time chat
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      // This system instruction gives the chatbot its empathetic personality
      systemInstruction: `You are an empathetic, emotionally understanding, and uplifting AI companion for a mental wellness app called EchoLoop. 
      Your goal is to validate the user's feelings, offer gentle support, and guide them towards positive emotional self-awareness. 
      Do not act like a doctor or give medical advice. Keep your responses concise, warm, conversational, and deeply validating. 
      Mirror the user's tone—if they are sad, be comforting; if they are happy, celebrate with them.`,
    });

    // Start a chat session, passing in the previous conversation history for context
    const chat = model.startChat({
      history: history || [],
    });

    // Send the new message and await the response
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate a response." },
      { status: 500 }
    );
  }
}