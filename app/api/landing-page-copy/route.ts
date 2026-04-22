import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, product, audience, benefit } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Write full landing page copy for ${businessName}. Product: ${product}. Target audience: ${audience}. Main benefit: ${benefit}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "headline": "Main hero headline",
  "subheadline": "Supporting subheadline",
  "heroDescription": "2-3 sentence hero section description.",
  "features": [
    { "title": "Feature title", "description": "Feature description." },
    { "title": "Feature title", "description": "Feature description." },
    { "title": "Feature title", "description": "Feature description." }
  ],
  "socialProof": "A compelling testimonial or social proof statement.",
  "cta": "Call to action button text",
  "ctaDescription": "Supporting text under the CTA button."
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}