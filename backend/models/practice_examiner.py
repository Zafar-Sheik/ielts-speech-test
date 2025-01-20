from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

template =  """Start the exam. 
Here is the conversation history:{context} Question: {student_entry}"""

# Load the language model
model = OllamaLLM(model="jack")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    context = ""
   
    print("Welcome To I E L T S Speech Exam")
    while True: 
        user_input = input ("You: ")
        if user_input.lower() == 'exit':
            break
        
        # Get the AI response
        result = chain.invoke({"context": context, "student_entry": user_input})

        # Print the JSON response
        print("Jack: ", result)

        
        # Update the context
        context += f"\nUser: {user_input}\nAI: {result}"

handle_conversation()
