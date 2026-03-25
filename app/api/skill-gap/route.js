// import { NextResponse } from "next/server";

// const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

// export async function POST(request) {
//   const body = await request.json();
//   const { user_skills, target_role } = body;

//   if (!user_skills || user_skills.length === 0) {
//     return NextResponse.json({ error: "user_skills is required" }, { status: 400 });
//   }

//   const response = await fetch(`${ML_SERVICE_URL}/predict`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ user_skills, target_role }),
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }

// export async function GET() {
//   const response = await fetch(`${ML_SERVICE_URL}/roles`);
//   const data = await response.json();
//   return NextResponse.json(data);
// }
// import { NextResponse } from "next/server";
// import { db } from "@/lib/prisma";

// const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { user_skills, target_role, userId } = body;

//     if (!user_skills || user_skills.length === 0) {
//       return NextResponse.json({ error: "user_skills is required" }, { status: 400 });
//     }

//     // 🔥 Call ML service
//     const response = await fetch(`${ML_SERVICE_URL}/predict`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_skills, target_role }),
//     });

//     const data = await response.json();

//     // 🔥 SAVE TO DATABASE
//     await db.skillGapAnalysis.create({
//       data: {
//         userId: userId || "anonymous", // or from Clerk
//         userSkills: JSON.stringify(user_skills),
//         targetRole: target_role || "auto",
//       },
//     });

//     return NextResponse.json(data);

//   } catch (error) {
//     console.error("ERROR:", error);
//     return NextResponse.json({ error: "Failed to process" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";



export async function POST(request) {
  try {
    const body = await request.json();
    const { user_skills, target_role, userId } = body;

    if (!user_skills || user_skills.length === 0) {
      return NextResponse.json(
        { error: "user_skills is required" },
        { status: 400 }
      );
    }

    // 🔥 Call ML service
    const response = await fetch(`${ML_SERVICE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_skills, target_role }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "ML service failed" },
        { status: 500 }
      );
    }

    const text = await response.text();
    if (!text) {
      return NextResponse.json(
        { error: "Empty response from ML service" },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    // ✅ 🔥 FIX: FIND USER IN DB USING CLERK ID
    let dbUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // ✅ Auto-create user if not exists
    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          clerkUserId: userId,
          email: `${userId}@example.com`, // temp fallback
        },
      });
    }

    // 🔥 SAVE TO DATABASE (FIXED)
    await db.skillGapAnalysis.create({
      data: {
        userId: dbUser.id, // ✅ IMPORTANT FIX
        userSkills: JSON.stringify(user_skills),
        targetRole: data.target_role || "auto",
        matchScore: data.match_score || 0,
        missingSkills: JSON.stringify(data.missing_skills || []),
        matchedSkills: JSON.stringify(data.matched_skills || []),
      },
    });

    return NextResponse.json(data);

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to process" },
      { status: 500 }
    );
  }
}

// ✅ GET (THIS WAS MISSING → MAIN ERROR FIX)
export async function GET() {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/roles`);

    // ❗ Check response
    if (!response.ok) {
      console.log("ML roles API failed");
      return NextResponse.json({ roles: [] });
    }

    const text = await response.text();

    // ❗ Handle empty response
    if (!text) {
      console.log("Empty roles response");
      return NextResponse.json({ roles: [] });
    }

    const data = JSON.parse(text);

    return NextResponse.json(data);

  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ roles: [] });
  }
}