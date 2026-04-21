import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { name, role, industry, achievements } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique professional bios for ${name}, a ${role || "professional"} in the ${industry || "general"} industry.
Key achievements/background: ${achievements || "not specified"}

For each bio provide:
1. A professional bio (2-3 sentences)
2. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "bio": "Your professional bio here",
  "reason": "Why this bio works"
}]`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Invalid response" }, { status: 500 });
  }

  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Parse error" }, { status: 500 });
  }

  const bios = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ bios });
}