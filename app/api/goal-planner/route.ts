import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessName, mainGoal, currentStage, resources } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Create a 90-day goal plan for ${businessName}. Main goal: ${mainGoal}. Current stage: ${currentStage}. Available resources: ${resources}.

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object:
{
  "overview": "90-day plan overview sentence.",
  "month1": {
    "focus": "Month 1 focus area",
    "goals": ["Goal 1", "Goal 2", "Goal 3"],
    "keyAction": "The single most important action this month."
  },
  "month2": {
    "focus": "Month 2 focus area",
    "goals": ["Goal 1", "Goal 2", "Goal 3"],
    "keyAction": "The single most important action this month."
  },
  "month3": {
    "focus": "Month 3 focus area",
    "goals": ["Goal 1", "Goal 2", "Goal 3"],
    "keyAction": "The single most important action this month."
  },
  "successMetrics": ["Metric 1", "Metric 2", "Metric 3"]
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const clean = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(clean);
  return NextResponse.json(json);
}