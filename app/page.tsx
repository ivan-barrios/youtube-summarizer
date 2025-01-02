"use client";
import { Suspense, useState } from "react";
import VideoSummaryForm from "@/components/VideoSummaryForm";
import Results from "@/components/Results";

export default function Home() {
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummaryReceived = (newSummary: string) => {
    setSummary(newSummary);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        EchoReel
      </h1>
      <p className="text-xl mb-12 text-gray-300 text-center">
        Distill YouTube videos into concise summaries
      </p>
      <VideoSummaryForm onSummaryReceived={handleSummaryReceived} />
      <Suspense fallback={<div>Loading...</div>}>
        <Results summary={summary} />
      </Suspense>
    </main>
  );
}
