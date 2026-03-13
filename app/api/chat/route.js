
import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {

    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Save user message
    await db.chatMessage.create({
      data: {
        userId: user.id,
        role: "user",
        message
      }
    });

    /*
    ==========================
    GET LAST MESSAGES (CONTEXT)
    ==========================
    */

    const history = await db.chatMessage.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      take: 6 // last 6 messages
    });

    const conversation = history
      .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.message}`)
      .join("\n");

    const prompt = `
You are Mentora AI, an AI career coach.

Help users with:
career guidance
interview preparation
resume improvement
job skills

Conversation history:
${conversation}

User question:
${message}

Rules:
Use plain text only.
Do not use markdown or symbols.
Write short clear paragraphs.
Maximum 5 sentences.

Give a helpful answer.
`;

    let reply;

    try {

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });

      reply = result.text.trim();

    } catch (error) {

      if (error.status === 429) {
        reply = "Mentora AI is currently busy. Please try again in a minute.";
      } else {
        reply = "Mentora AI could not generate a response right now.";
      }

      console.error("Gemini Error:", error);
    }

    // Save AI response
    await db.chatMessage.create({
      data: {
        userId: user.id,
        role: "assistant",
        message: reply
      }
    });

    return Response.json({ reply });

  } catch (error) {

    console.error("Chatbot Error:", error);

    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}


export async function GET() {

  const { userId } = await auth();

  if (!userId) {
    return Response.json([]);
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId }
  });

  if (!user) {
    return Response.json([]);
  }

  const messages = await db.chatMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" }
  });

  return Response.json(messages);
}
