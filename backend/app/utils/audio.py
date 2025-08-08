import subprocess
from pathlib import Path

def convert_to_wav_16k_mono(input_path: str, out_path: str):
    # ffmpeg -i infile -ar 16000 -ac 1 outfile.wav
    cmd = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-ar", "16000",
        "-ac", "1",
        "-loglevel", "error",
        out_path
    ]
    subprocess.run(cmd, check=True)
    return out_path #convert to waw
