import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, product, customerName, platform } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate testimonial request emails for ${businessName}. Product/service: ${product}. Customer name: ${customerName}. Platform to leave review: ${platform}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "emails": [
    { "subject": "Email subject line", "body": "Full email body.", "style": "Style e.g. Friendly & Casual" },
    { "subject": "Email subject line", "body": "Full email body.", "style": "Style" },
    { "subject": "Email subject line", "body": "Full email body.", "style": "Style" }
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