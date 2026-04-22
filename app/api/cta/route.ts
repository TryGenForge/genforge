import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, product, audience, goal } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate call-to-action copy for ${businessName}. Product: ${product}. Target audience: ${audience}. Goal: ${goal}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "ctas": [
    { "button": "Button text", "supporting": "Supporting text below the button.", "context": "Where to use this CTA e.g. Hero section" },
    { "button": "Button text", "supporting": "Supporting text below the button.", "context": "Where to use this CTA" },
    { "button": "Button text", "supporting": "Supporting text below the button.", "context": "Where to use this CTA" },
    { "button": "Button text", "supporting": "Supporting text below the button.", "context": "Where to use this CTA" },
    { "button": "Button text", "supporting": "Supporting text below the button.", "context": "Where to use this CTA" }
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