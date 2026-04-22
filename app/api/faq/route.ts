import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, industry, product, audience } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate FAQs for ${businessName}, a ${industry} business. Product/service: ${product}. Target audience: ${audience}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "faqs": [
    { "question": "Question?", "answer": "Detailed answer." },
    { "question": "Question?", "answer": "Detailed answer." },
    { "question": "Question?", "answer": "Detailed answer." },
    { "question": "Question?", "answer": "Detailed answer." },
    { "question": "Question?", "answer": "Detailed answer." },
    { "question": "Question?", "answer": "Detailed answer." }
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