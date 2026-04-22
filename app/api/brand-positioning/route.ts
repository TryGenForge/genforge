import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessType, targetAudience, competitors, uniqueValue } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate a brand positioning statement for a ${businessType} business. Target audience: ${targetAudience}. Competitors: ${competitors}. Unique value: ${uniqueValue}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "statement": "Full positioning statement in one paragraph.",
  "targetAudience": "Refined target audience description.",
  "differentiation": "What makes this brand uniquely different.",
  "promise": "The core brand promise in one sentence.",
  "alternatives": ["Alternative positioning angle 1", "Alternative positioning angle 2", "Alternative positioning angle 3"]
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}