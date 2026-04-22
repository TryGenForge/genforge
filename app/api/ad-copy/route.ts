import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, product, audience, platform } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate ${platform} ad copy for ${businessName}. Product: ${product}. Target audience: ${audience}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "ads": [
    { "headline": "Ad headline (max 30 chars)", "description": "Ad description (max 90 chars)", "cta": "CTA text" },
    { "headline": "Ad headline (max 30 chars)", "description": "Ad description (max 90 chars)", "cta": "CTA text" },
    { "headline": "Ad headline (max 30 chars)", "description": "Ad description (max 90 chars)", "cta": "CTA text" },
    { "headline": "Ad headline (max 30 chars)", "description": "Ad description (max 90 chars)", "cta": "CTA text" },
    { "headline": "Ad headline (max 30 chars)", "description": "Ad description (max 90 chars)", "cta": "CTA text" }
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