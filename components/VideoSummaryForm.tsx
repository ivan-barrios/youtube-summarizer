"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchTranscript, fetchSummary } from "@/utils/api";

export default function VideoSummaryForm({
  onSummaryReceived,
}: {
  onSummaryReceived: (summary: string) => void;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSummary("");

    try {
      const url = new URL(videoUrl);
      const videoId = url.searchParams.get("v");

      if (!videoId) {
        alert("Invalid YouTube link");
        setIsLoading(false);
        return;
      }

      // Fetch the transcript
      const transcript = await fetchTranscript(videoId);

      // Summarize the transcript
      const generatedSummary = await fetchSummary(transcript);

      setSummary(generatedSummary || "Summary not available");
      onSummaryReceived(generatedSummary);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message || "Error generating summary");
      } else {
        alert("Error generating summary");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-[20px] flex-col md:flex-row justify-center items-center">
        <Input
          type="url"
          placeholder="Paste YouTube URL here"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="flex-grow bg-gray-800 text-white border-gray-700"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 flex justify-center w-[200px]"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Summarize"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
