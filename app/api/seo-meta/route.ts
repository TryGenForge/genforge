import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { pageName, industry, keywords, audience } = await req.json();

  if (!pageName) {
    return NextResponse.json({ error: "Page name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique SEO meta titles and descriptions for a page called "${pageName}" in the ${industry || "general"} industry.
Target keywords: ${keywords || "not specified"}
Target audience: ${audience || "general"}

For each meta set provide:
1. A meta title (50-60 characters)
2. A meta description (150-160 characters)
3. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "title": "Your meta title here",
  "description": "Your meta description here",
  "reason": "Why this works"
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

  const metas = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ metas });
}