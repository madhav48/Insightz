import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()


class LLM:
    def __init__(self, system_message: str = ""):
        """
        Initialize the LLM with API key and system message.
        """
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.system_message = system_message

        # for model in genai.list_models():
        #     print(model)


    def send_message_with_history(self, history: list, message: str, save_history = False) -> str:
        """
        Accepts the full conversation history and a new message,
        sends it to the Gemini model, and returns the response.
        The history should be a list of dicts:
        [{"role": "user"/"model", "parts": [{"text": "..."}, ...]}, ...]
        """
        try:
            model = genai.GenerativeModel(
                model_name="gemini-2.0-flash",
                system_instruction=self.system_message,
            )
            # Append the new user message to the history
            chat = model.start_chat(history=history)
            response = chat.send_message(message)

            # print(response)

            if save_history:
                # Append the new message to the history
                self.append_to_history(history, "user", message)
                self.append_to_history(history, "model", response.text)

            return response.text
        except Exception as e:
            print(f"Error while sending message: {e}")
            return ""
        
    def append_to_history(self, history: list, role: str, text: str) -> list:
        """
        Appends a new message to the conversation history.
        """
        history.append({
            "role": role,
            "parts": [{"text": text}]
        })

# Example usage:
if __name__ == "__main__":
    from llm_system_messages import *
    SYSTEM_MESSAGE = QUERY_PARSE_INSTRUCTIONS
    llm = LLM(system_message=SYSTEM_MESSAGE)
    # Example history
    history = [
        {"role": "user", "parts": [{"text": "Hello"}]},
        {"role": "model", "parts": [{"text": "Hi! How can I help you?"}]}
    ]

    while(True):
        query = input()
        reply = llm.send_message_with_history(history, query)
        history += [
        {"role": "user", "parts": [{"text": query}]},
        {"role": "model", "parts": [{"text": reply}]}
    ]
        print("LLM Response:", reply)

