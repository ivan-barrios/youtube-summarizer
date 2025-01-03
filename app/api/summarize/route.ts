import { generateText } from 'ai';
import { createMistral } from '@ai-sdk/mistral';

const mistral = createMistral();

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { transcript } = await request.json();

    if (!transcript) {
      return new Response(JSON.stringify({ error: "Transcript is required" }), {
        status: 400,
      });
    }

    // Generate the summary
    const response = await generateText({
      model: mistral("mistral-large-latest"),
      system: "You are an AI summarizer. Your task is to summarize YouTube transcripts. Add punctuation and capitalization where necessary. You make the summary in the same language as the transcript. You should summarize the transcript in a concise manner, highlighting key points, arguments, and any notable quotes. You should add headings, bullet points and numbered lists where appropriate.",
      prompt: `Summarize the following transcript concisely, highlighting key points, arguments, and any notable quotes. All the topics in the transcript should be in the summary, explained as it should be. DO NOT TALK ABOUT THE TRANSCRIPT. ONLY ABOUT THE VIDEO Transcript: ${transcript}`,
    });

    // Return the summary as a response
    return new Response(JSON.stringify({ summary: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
      status: 500,
    });
  }
}
