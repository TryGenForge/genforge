import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { companyName, industry, founder, problem } = await req.json();

  if (!companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique brand stories for a company called "${companyName}" in the ${industry || "general"} industry.
Founder/background: ${founder || "not specified"}
Problem they solve: ${problem || "not specified"}

For each brand story provide:
1. A short compelling brand story (2-3 sentences)
2. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "story": "Your brand story here",
  "reason": "Why this story works"
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

  const stories = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ stories });
}