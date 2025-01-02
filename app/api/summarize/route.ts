import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  const { transcript } = await request.json();

  if (!transcript) {
    return new Response(JSON.stringify({ error: "Transcript is required" }), {
      status: 400,
    });
  }

  const stream = await streamText({
    model: openai("gpt-4o"), // Use the gpt-4o model for optimal results
    system: "You are an AI summarizer. Your task is to summarize YouTube transcripts.",
    messages: [
      {
        role: "user",
        content: `
Summarize the following transcript concisely, highlighting key points, arguments, and any notable quotes:

Transcript:
${transcript}
        `,
      },
    ],
  });

  return stream.toDataStreamResponse();
}
