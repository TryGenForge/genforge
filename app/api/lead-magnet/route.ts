import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessType, audience, problem } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate lead magnet ideas for a ${businessType} business. Target audience: ${audience}. Main problem they solve: ${problem}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "ideas": [
    { "title": "Lead magnet title", "type": "Type e.g. Checklist, Template, Guide", "description": "What it contains and why people would want it.", "hook": "The opt-in hook sentence to promote it." },
    { "title": "Lead magnet title", "type": "Type", "description": "What it contains and why people would want it.", "hook": "The opt-in hook sentence." },
    { "title": "Lead magnet title", "type": "Type", "description": "What it contains and why people would want it.", "hook": "The opt-in hook sentence." },
    { "title": "Lead magnet title", "type": "Type", "description": "What it contains and why people would want it.", "hook": "The opt-in hook sentence." },
    { "title": "Lead magnet title", "type": "Type", "description": "What it contains and why people would want it.", "hook": "The opt-in hook sentence." }
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