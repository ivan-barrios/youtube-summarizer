import sys
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled

def get_transcript(video_id):
    try:
        # List available transcripts for the video
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

        # Attempt to fetch the transcript in the preferred language or auto-detect
        transcript = None
        language = None

        try:
            # Prefer English transcript if available
            transcript = transcript_list.find_transcript(["en"]).fetch()
            language = "en"
        except Exception:
            # Fallback to any available transcript
            transcript = transcript_list.find_transcript(["es"]).fetch()
            language = "es"
        except Exception:
            # Use auto-generated transcripts if manual transcripts are unavailable
            transcript = transcript_list.find_transcript(["a-en", "a-es"]).fetch()
            language = transcript_list.find_transcript(["a-en", "a-es"]).language_code

        # Convert transcript to a single string
        transcript_text = " ".join([entry['text'] for entry in transcript])

        # Return transcript and language
        return {"transcript": transcript_text, "language": language}

    except TranscriptsDisabled:
        return {"error": "Transcripts are disabled for this video."}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: Video ID is required.", file=sys.stderr)
        sys.exit(1)

    video_id = sys.argv[1]

    result = get_transcript(video_id)

    # Print the result as a JSON string
    import json
    print(json.dumps(result))
