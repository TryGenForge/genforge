import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { topic, audience, tone } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Write blog post intros for the topic: "${topic}". Target audience: ${audience}. Tone: ${tone}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "intros": [
    { "hook": "Opening hook sentence.", "intro": "Full intro paragraph (3-4 sentences).", "style": "Style name e.g. Question Hook" },
    { "hook": "Opening hook sentence.", "intro": "Full intro paragraph (3-4 sentences).", "style": "Style name" },
    { "hook": "Opening hook sentence.", "intro": "Full intro paragraph (3-4 sentences).", "style": "Style name" }
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