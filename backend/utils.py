# utils.py
response = ""
transcription = ""
is_ready = False  # Flag to track readiness

def set_result(ai_response):
    global response, is_ready  # Declare response and is_ready as global
    response = ai_response
    is_ready = True  # Set ready flag to True once AI response is available

def get_result():
    global response
    return response

def set_transcription(ai_transcription):
    global transcription, is_ready  # Declare transcription and is_ready as global
    transcription = ai_transcription
    is_ready = False  # Reset ready flag if transcription has been updated

def get_transcription():
    global transcription
    return transcription

def is_system_ready():
    global is_ready
    return is_ready  # Return the readiness status
