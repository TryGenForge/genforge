import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { productName, category, features, audience } = await req.json();

  if (!productName) {
    return NextResponse.json({ error: "Product name is required" }, { status: 400 });
  }

  const prompt = `Generate 6 unique product descriptions for "${productName}" in the ${category || "general"} category.
Key features: ${features || "not specified"}
Target audience: ${audience || "general consumers"}

For each description provide:
1. A compelling product description (2-3 sentences)
2. Why it works (1 sentence)

Format as JSON array only, no other text:
[{
  "description": "Your product description here",
  "reason": "Why this description works"
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

  const descriptions = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ descriptions });
}