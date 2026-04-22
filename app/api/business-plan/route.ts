import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, industry, targetMarket, revenue, timeframe } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Write a business plan summary for ${businessName}, a ${industry} business. Target market: ${targetMarket}. Revenue model: ${revenue}. Timeframe: ${timeframe}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "executive": "Executive summary paragraph.",
  "problem": "Problem statement paragraph.",
  "solution": "Solution paragraph.",
  "market": "Target market and opportunity paragraph.",
  "model": "Business model and revenue paragraph.",
  "milestones": ["Milestone 1", "Milestone 2", "Milestone 3", "Milestone 4"],
  "risks": ["Risk 1", "Risk 2", "Risk 3"]
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}