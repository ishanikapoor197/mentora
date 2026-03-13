
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {

  try {

    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

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


Give a clear and helpful answer.
`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = result.text.trim();

    return Response.json({ reply });

  } catch (error) {

    console.error("Chatbot Error:", error);

    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}