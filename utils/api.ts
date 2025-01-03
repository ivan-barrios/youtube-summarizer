export async function fetchTranscript(videoId: string): Promise<string> {
    const response = await fetch("/api/transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch transcript");
    }
  
    const { transcript } = await response.json();
    return transcript;
  }
  
  export async function fetchSummary(transcript: string): Promise<string> {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
  
    if (!response.body) {
      throw new Error("Failed to fetch summary");
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let done = false;
    
    while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        fullText += decoder.decode(value, { stream: true });
    }
    
    
    return fullText.trim();
  }
  