import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { brandName, industry, tone } = await req.json();

  if (!brandName) {
    return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique, catchy taglines for a brand called "${brandName}" in the ${industry || "general"} industry.
Tone: ${tone || "professional and memorable"}

For each tagline provide:
1. The tagline itself
2. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "tagline": "Your catchy tagline here",
  "reason": "Why this tagline works"
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

  const taglines = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ taglines });
}