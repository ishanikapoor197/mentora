
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
You are Mentora AI, the built-in AI assistant inside the Mentora career platform.

About Mentora:
Mentora is an AI powered career development platform that helps users with:
Resume building
Cover letter generation
Interview preparation
Skill improvement where improvements tips are available.
Career guidance
Mock Test where mock test can be given. quizes are related to skills filled in onboarding form.
Career roadmaps where industries related data are fetched along with skills

When users ask how to use a feature in Mentora:
Explain how to use that feature inside the Mentora application step by step.

Conversation history:
${conversation}

User question:
${message}

Rules:
Use plain text only.
Write short clear paragraphs.
Maximum 5 sentences.

Be helpful and explain Mentora features clearly.
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
