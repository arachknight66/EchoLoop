import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

# -----------------------------
# 1. LOAD SUMMARIZER
# -----------------------------
sum_model_name = "sshleifer/distilbart-cnn-12-6"
sum_tokenizer = AutoTokenizer.from_pretrained(sum_model_name)
sum_model = AutoModelForSeq2SeqLM.from_pretrained(sum_model_name)

# -----------------------------
# 2. LOAD EMOTION MODEL
# -----------------------------
emotion_model_name = "tsid7710/distillbert-emotion-model"

emotion_pipe = pipeline(
    "text-classification",
    model=emotion_model_name,
    top_k=None
)

# -----------------------------
# HUMAN READABLE EMOTIONS
# -----------------------------
emotions_decoded = [
    "sad",
    "happy",
    "in love",
    "angry",
    "frightened",
    "surprised"
]

# -----------------------------
# JOURNAL ANALYSIS FUNCTION
# -----------------------------
def analyze_journal_v4(text):

    # STEP A: SUMMARIZATION
    inputs = sum_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=1024, # Added explicit max_length
        padding=True
    )

    # Added **inputs to pass both input_ids AND attention_mask
    summary_ids = sum_model.generate(
        **inputs, 
        max_new_tokens=50,
        min_length=15,
        do_sample=False
    )

    summary_text = sum_tokenizer.decode(
        summary_ids[0],
        skip_special_tokens=True
    )

    # STEP B: EMOTION ANALYSIS
    raw_results = emotion_pipe(text, truncation=True, max_length=512)

    # Automatically handle different transformers version outputs
    if isinstance(raw_results[0], list):
        results = raw_results[0]  # Handles [[{...}, {...}]]
    else:
        results = raw_results     # Handles [{...}, {...}]

    formatted_results = {}

    for res in results:
        # Now 'res' is guaranteed to be a dictionary, so this will work safely
        label_index = int(res["label"].split("_")[1])
        label_name = emotions_decoded[label_index]

        score_percent = res["score"] * 100
        formatted_results[label_name] = f"{score_percent:.2f}%"

    # sort by percentage
    formatted_results = dict(
        sorted(
            formatted_results.items(),
            key=lambda x: float(x[1].strip("%")),
            reverse=True
        )
    )

    return summary_text, formatted_results

# -----------------------------
# REFINE TOP EMOTIONS
# -----------------------------
def get_refined_emotions(emotion_dict, gap_threshold=15.0):

    emotions_float = {}

    for label, perc in emotion_dict.items():
        emotions_float[label] = float(perc.split("%")[0])

    # sort descending
    emotions_float = dict(
        sorted(
            emotions_float.items(),
            key=lambda x: x[1],
            reverse=True
        )
    )

    max_perc = next(iter(emotions_float.values()))
    result_emotions = []

    for label, score in emotions_float.items():
        if max_perc - score <= gap_threshold:
            result_emotions.append(label)

    return result_emotions

# --- Test Execution ---
if __name__ == "__main__":
    test_entry = "I felt really overwhelmed today with all my deadlines, but after taking a walk I realized everything is going to be okay. I'm actually pretty excited about the weekend."
    
    summary, emotions = analyze_journal_v4(test_entry)
    refined = get_refined_emotions(emotions)
    
    print("Summary:", summary)
    print("All Emotions:", emotions)
    print("Refined Dominant Emotions:", refined)