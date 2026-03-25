import { NextResponse } from "next/server";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

export async function POST(request) {
  const body = await request.json();
  const { user_skills, target_role } = body;

  if (!user_skills || user_skills.length === 0) {
    return NextResponse.json({ error: "user_skills is required" }, { status: 400 });
  }

  const response = await fetch(`${ML_SERVICE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_skills, target_role }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export async function GET() {
  const response = await fetch(`${ML_SERVICE_URL}/roles`);
  const data = await response.json();
  return NextResponse.json(data);
}
