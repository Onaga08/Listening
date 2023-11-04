import os
import speech_recognition as sr
from langdetect import detect

# Function to create and open a txt file
def create_and_open_txt(text, filename):
    # Create and write the text to a txt file
    with open(filename, "w") as file:
        file.write(text)
    startfile(filename)

# Function to open a file
def startfile(fn):
    os.system('open %s' % fn)

# Provide the path to your locally recorded audio file
audio_file_path = r'D:\Coding\hello\uploads\uploaded_audio.wav'

# Initialize the ASR recognizer
recognizer = sr.Recognizer()

# Function to transcribe audio
def transcribe_audio(audio_file):
    with sr.AudioFile(audio_file) as source:
        audio = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio)  # Using Google Web API for ASR
            return text
        except sr.UnknownValueError:
            print("ASR could not understand the audio")
        except sr.RequestError as e:
            print(f"Could not request results from ASR; {e}")

# Transcribe the audio
transcribed_text = transcribe_audio(audio_file_path)
print(transcribed_text)

# Detect the language
language = detect(transcribed_text)
print(f"Detected language: {language}")

# Create and open a txt file with the text
create_and_open_txt(transcribed_text, f"output_{language}.txt")