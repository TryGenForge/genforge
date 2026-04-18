import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { businessType, keywords, style } = await req.json();

  if (!businessType) {
    return NextResponse.json({ error: "Business type is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique, creative business names for a ${businessType} business.
Keywords/themes to incorporate: ${keywords || "none specified"}
Style preference: ${style || "modern and professional"}

For each name provide:
1. The business name
2. A one-line tagline
3. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "name": "BusinessName",
  "tagline": "Short catchy tagline",
  "reason": "Why this name works"
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

  const names = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ names });
}