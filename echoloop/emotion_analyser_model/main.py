from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import analyze_journal_v4, get_refined_emotions

app = FastAPI()

# Allow requests from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Update this when you deploy!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JournalInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze(payload: JournalInput):
    summary, emotions = analyze_journal_v4(payload.text)
    refined = get_refined_emotions(emotions)

    return {
        "summary": summary,
        "all_emotions": emotions,
        "top_emotions": refined
    }