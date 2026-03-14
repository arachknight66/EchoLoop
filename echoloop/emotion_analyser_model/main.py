from fastapi import FastAPI
from pydantic import BaseModel

from models import analyze_journal_v4

app = FastAPI()

# ---------------------
# Request format
# ---------------------

class JournalInput(BaseModel):
    text: str


# ---------------------
# API Endpoint
# ---------------------

from fastapi import FastAPI
from pydantic import BaseModel

from models import analyze_journal_v4, get_refined_emotions

app = FastAPI()


class JournalInput(BaseModel):
    text: str


@app.post("/analyze")
def analyze(input: JournalInput):

    summary, emotions = analyze_journal_v4(input.text)

    refined = get_refined_emotions(emotions)

    return {
        "summary": summary,
        "all_emotions": emotions,
        "top_emotions": refined
    }