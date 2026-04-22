import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, product, pricing, audience } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate pricing page copy for ${businessName}. Product: ${product}. Pricing: ${pricing}. Target audience: ${audience}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "headline": "Pricing page headline",
  "subheadline": "Supporting subheadline",
  "plans": [
    {
      "name": "Plan name",
      "price": "Price",
      "description": "Plan description",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "cta": "CTA button text",
      "highlighted": false
    },
    {
      "name": "Plan name",
      "price": "Price",
      "description": "Plan description",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
      "cta": "CTA button text",
      "highlighted": true
    }
  ],
  "guarantee": "Money-back guarantee or trust statement.",
  "faq": [
    { "question": "Pricing FAQ question?", "answer": "Answer." },
    { "question": "Pricing FAQ question?", "answer": "Answer." }
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