import mammoth from "mammoth";

export async function POST(req) {
  try {

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let text = "";

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

      const result = await mammoth.extractRawText({ buffer });
      text = result.value;

    } else {
      return Response.json(
        { error: "Only DOCX files are supported" },
        { status: 400 }
      );
    }

    return Response.json({ text });

  } catch (err) {

    console.error("Resume parsing error:", err);

    return Response.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}