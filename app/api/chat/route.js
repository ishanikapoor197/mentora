
// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export async function POST(req) {

//   try {

//     const { message } = await req.json();

//     if (!message) {
//       return Response.json({ error: "Message required" }, { status: 400 });
//     }

//     const prompt = `
// You are Mentora AI, an AI career coach.

// Help users with:
// - career guidance
// - interview preparation
// - resume improvement
// - job skills

// User Question:
// ${message}

// Rules:
// - Do NOT use markdown
// - Do NOT use symbols like *, -, or #
// - Write in simple paragraphs
// - Keep the answer clear and concise

// Give a clean plain text answer.


// Give a clear and helpful answer.
// `;

//     const result = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     const reply = result.text.trim();

//     return Response.json({ reply });

//   } catch (error) {

//     console.error("Chatbot Error:", error);

//     return Response.json(
//       { error: "Failed to generate response" },
//       { status: 500 }
//     );
//   }
// }
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

    const prompt = `
You are Mentora AI, an AI career coach.

Help users with:
 - career guidance
 - interview preparation
 - resume improvement
 - job skills

 User Question:
 ${message}
 Rules:
 - Do NOT use markdown
 - Do NOT use symbols like *, -, or #
 - Write in simple paragraphs
 - Keep the answer clear and concise

 Give a clean plain text answer.

Give a helpful and concise answer in plain text.
`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = result.text.trim();

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