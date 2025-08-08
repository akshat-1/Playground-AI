from pyannote.audio import Pipeline

# Load once globally
DIAR_PIPELINE = Pipeline.from_pretrained("pyannote/speaker-diarization")  # needs HF token env var

def diarize_file(wav_path: str, max_speakers: int = 2):
    # returns list of segments: [{start, end, speaker_label}]
    diarization = DIAR_PIPELINE(wav_path)
    segments = []
    for segment, track, label in diarization.itertracks(yield_label=True):
        segments.append({
            "start": float(segment.start),
            "end": float(segment.end),
            "speaker": label
        })
    # If diarizer returns > max_speakers: map to top 2 speakers by speech time
    return segments
