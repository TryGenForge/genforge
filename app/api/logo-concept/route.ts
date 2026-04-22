import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, industry, style, values } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate logo concepts for ${businessName}, a ${industry} business. Style: ${style}. Values: ${values}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "concepts": [
    {
      "name": "Concept name",
      "description": "Visual description of the logo concept.",
      "symbolism": "What the design elements represent.",
      "colors": ["#hexcode", "#hexcode", "#hexcode"],
      "colorNames": ["Color name", "Color name", "Color name"],
      "typography": "Font style recommendation.",
      "mood": "Overall mood this logo conveys."
    },
    {
      "name": "Concept name",
      "description": "Visual description of the logo concept.",
      "symbolism": "What the design elements represent.",
      "colors": ["#hexcode", "#hexcode", "#hexcode"],
      "colorNames": ["Color name", "Color name", "Color name"],
      "typography": "Font style recommendation.",
      "mood": "Overall mood this logo conveys."
    },
    {
      "name": "Concept name",
      "description": "Visual description of the logo concept.",
      "symbolism": "What the design elements represent.",
      "colors": ["#hexcode", "#hexcode", "#hexcode"],
      "colorNames": ["Color name", "Color name", "Color name"],
      "typography": "Font style recommendation.",
      "mood": "Overall mood this logo conveys."
    }
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