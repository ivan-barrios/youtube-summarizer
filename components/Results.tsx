"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Results({ summary }: { summary: string | null }) {
  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mt-12"
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-400">
            Video Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{summary}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
