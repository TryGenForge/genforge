import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { companyName, industry, problem, solution } = await req.json();

  if (!companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique elevator pitches for a company called "${companyName}" in the ${industry || "general"} industry.
Problem they solve: ${problem || "not specified"}
Their solution: ${solution || "not specified"}

For each elevator pitch provide:
1. A compelling 30-second elevator pitch (3-4 sentences)
2. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "pitch": "Your elevator pitch here",
  "reason": "Why this pitch works"
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

  const pitches = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ pitches });
}