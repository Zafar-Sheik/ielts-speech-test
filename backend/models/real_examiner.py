from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from utils import get_transcription, set_result, set_transcription

template =  """Start the exam. 
Here is the conversation history:{context} Student Entry: {student_entry}"""

# Load the language model
model = OllamaLLM(model="jack")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    context = ""
   
    print("Welcome To I E L T S Speech Exam")
    while True: 
        user_input = input (get_transcription())
        if user_input.lower() == 'exit':
            break
        
        # Get the AI response
        result = chain.invoke({"context": context, "student_entry": user_input})

        # Set transcription
        set_transcription(user_input)  # Transcription is received

        # Process the transcription and generate AI response
        result = "Processing..."  # Placeholder for result generation (e.g., AI model processing)
        
        # Set result once processing is complete
        set_result(result)

        # Print the JSON response
        
        print("Jack: ", result)

        
        # Update the context
        context += f"\nUser: {user_input}\nAI: {result}"

handle_conversation()
