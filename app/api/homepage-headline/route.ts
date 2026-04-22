import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, industry, targetAudience, benefit } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate homepage headlines for ${businessName}, a ${industry} business. Target audience: ${targetAudience}. Main benefit: ${benefit}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "headlines": [
    { "headline": "Main headline", "subheadline": "Supporting subheadline", "style": "Style description e.g. Bold & Direct" },
    { "headline": "Main headline", "subheadline": "Supporting subheadline", "style": "Style description" },
    { "headline": "Main headline", "subheadline": "Supporting subheadline", "style": "Style description" },
    { "headline": "Main headline", "subheadline": "Supporting subheadline", "style": "Style description" },
    { "headline": "Main headline", "subheadline": "Supporting subheadline", "style": "Style description" }
  ]
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}