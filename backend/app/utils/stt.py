import requests

def transcribe_segment_with_vendor(audio_bytes: bytes, vendor="openai"):
    if vendor == "openai":
        response = requests.post(
            "https://api.openai.com/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            files={"file": ("segment.wav", audio_bytes, "audio/wav")},
            data={"model": "whisper-1"}
        )
        data = response.json()
        return {"text": data["text"], "confidence": None}
