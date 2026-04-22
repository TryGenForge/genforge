import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { businessType, audience, personality } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate a brand voice guide for a ${businessType} business targeting ${audience}. Personality: ${personality}.

Return ONLY valid JSON in this exact format:
{
  "tone": "2-3 word tone description",
  "adjectives": ["word1", "word2", "word3", "word4"],
  "dos": ["Do this", "Do this", "Do this"],
  "donts": ["Don't do this", "Don't do this", "Don't do this"],
  "examples": ["Example sentence 1", "Example sentence 2", "Example sentence 3"]
}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const json = JSON.parse(text);
  return NextResponse.json(json);
}