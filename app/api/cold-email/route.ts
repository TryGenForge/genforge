import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { senderName, senderCompany, recipientRole, goal } = await req.json();

  if (!senderName) {
    return NextResponse.json({ error: "Sender name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique cold emails from ${senderName} at ${senderCompany || "their company"} to a ${recipientRole || "potential client"}.
Goal of the email: ${goal || "introduce the company and set up a meeting"}

For each email provide:
1. A subject line
2. The email body (3-4 sentences, conversational and not salesy)
3. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "subject": "Email subject line",
  "body": "Email body here",
  "reason": "Why this email works"
}]`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Invalid response" }, { status: 500 });
  }

  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Parse error" }, { status: 500 });
  }

  const emails = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ emails });
}