import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessType, mission, culture } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate core company values for a ${businessType} business. Mission: ${mission}. Culture: ${culture}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "values": [
    { "name": "Value Name", "description": "One sentence description.", "behaviour": "Practical example of this value in action." },
    { "name": "Value Name", "description": "One sentence description.", "behaviour": "Practical example of this value in action." },
    { "name": "Value Name", "description": "One sentence description.", "behaviour": "Practical example of this value in action." },
    { "name": "Value Name", "description": "One sentence description.", "behaviour": "Practical example of this value in action." },
    { "name": "Value Name", "description": "One sentence description.", "behaviour": "Practical example of this value in action." }
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