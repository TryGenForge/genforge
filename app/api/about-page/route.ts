import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, industry, founded, mission, values } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Write a compelling About page for ${businessName}, a ${industry} business. Founded: ${founded}. Mission: ${mission}. Values: ${values}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "headline": "Attention-grabbing About page headline.",
  "intro": "Opening paragraph that hooks the reader.",
  "story": "The brand story paragraph.",
  "mission": "Mission paragraph.",
  "closing": "Closing paragraph with a call to action."
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}