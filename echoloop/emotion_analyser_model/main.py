from fastapi import FastAPI
from pydantic import BaseModel
from models import analyze_journal_v4, get_refined_emotions

# Initialize the app once
app = FastAPI()

# ---------------------
# Request format
# ---------------------
class JournalInput(BaseModel):
    text: str

# ---------------------
# API Endpoint
# ---------------------
@app.post("/analyze")
def analyze(payload: JournalInput):  # Changed 'input' to 'payload'
    
    # Process the text using your models
    summary, emotions = analyze_journal_v4(payload.text)
    refined = get_refined_emotions(emotions)

    # Return the JSON response
    return {
        "summary": summary,
        "all_emotions": emotions,
        "top_emotions": refined
    }