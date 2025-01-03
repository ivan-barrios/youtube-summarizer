import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(request: Request): Promise<Response> {
  const { videoId } = await request.json();

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }

  const scriptPath = path.resolve("./utils/fetch_transcript.py");

  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [scriptPath, videoId]);

    let transcript = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      transcript += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ transcript }));
      } else {
        console.error("Python script error:", error);
        resolve(
          NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 })
        );
      }
    });

    pythonProcess.on("error", (err) => {
      console.error("Failed to start Python script:", err);
      reject(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    });
  });
}
