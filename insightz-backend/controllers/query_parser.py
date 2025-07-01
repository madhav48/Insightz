import re
import json
from services.llm import LLM
from services.llm_system_messages import *





class QueryParser:
    def __init__(self):
        self.llm = LLM(system_message= QUERY_PARSE_INSTRUCTIONS)
        self.response = GenerateResponseController()

    def handle_query(self, chat_history):
        """
        Parses the query by sending it to the LLM and extracting the JSON response.
        Returns a dict with the parsed parameters or None if parsing fails.
        """

        query = chat_history[-1]['parts'][0]['text'] if chat_history else ""
        history = chat_history[:-1]  # Exclude the last user message from history
        parsed_query = self.parse_query(history, query)

        if parsed_query:
            return self.response.generate_response(history, query, parsed_query)
        
        else:
            return "Sorry, I couldn't provide help at the moment."  # Fallback response

    def get_llm_response(self, history, message):
        """
        Sends the conversation history and message to the LLM and returns the raw response.
        """
        return self.llm.send_message_with_history(history, message)

    def extract_json_from_llm_response(self, llm_response):
        """
        Extracts and parses the JSON object from the LLM response wrapped in #### delimiters.
        Returns a Python dict if successful, else None.
        """
        try:
            # Extract content between the first pair of #### delimiters
            matches = re.findall(r"####\s*(\{.*?\})\s*####", llm_response, re.DOTALL)
            if not matches:
                return None
            json_str = matches[0]
            return json.loads(json_str)
        except Exception as e:
            print(f"Error parsing LLM JSON: {e}")
            return None
        
    def parse_query(self, history, message):
        """
        Parses the query by sending it to the LLM and extracting the JSON response.
        Returns a dict with the parsed parameters or None if parsing fails.
        """
        llm_response = self.get_llm_response(history, message)
        if not llm_response:
            return None
        
        parsed_json = self.extract_json_from_llm_response(llm_response)
        return parsed_json if parsed_json else None


class GenerateResponseController:

    def __init__(self):
        
        self.help_controller = HelpController()
        self.error_controller = ErrorController()


    def generate_response(self, history, message, action_json):
        """
        Generates a response from the LLM based on the conversation history and the new message.
        Returns the response text.
        """

        # Check for all the actions and generate response accordingly..
        action = action_json.get("action", "")
        print(action)
        if action == "report":
            # Handle report action
            return self.handle_report(history, message, action_json)
        elif action == "clarify_concept":
            # Handle clarify action
            return self.handle_clarify(history, message, action_json)
        elif action == "company_clarify":
            # Handle company clarify action
            return self.handle_company_clarify(history, message, action_json)
        elif action == "clarify_comparison":
            # Handle clarify comparison action
            return self.handle_clarify_comparison(history, message, action_json)
        elif action == "recommend":
            # Handle recommend action
            return self.handle_recommend(history, message, action_json)
        elif action == "news_summary":
            # Handle news summary action
            return self.handle_news_summary(history, message, action_json)
        elif action == "help":
            # Handle help action
            return self.help_controller.handle_help(history, message, action_json)
        elif action == "error":
            # Handle error action
            return self.error_controller.handle_error(history, message, action_json)
        else:
            # Default case for unknown actions
            return self.handle_internal_error(history, message, action_json)


class HelpController(LLM):
    def __init__(self):
        super().__init__(system_message=HELP_INSTRUCTIONS)

    def handle_help(self, history, message, action_json):
        """
        Handles the help action by providing information about the platform's capabilities.
        Returns a response text.
        """
        response = self.send_message_with_history(history, message)
        if not response:
            response = "Sorry, I couldn't provide help at the moment."  # Fallback response

        return response

class ErrorController(LLM):
    def __init__(self):
        super().__init__(system_message=HELP_INSTRUCTIONS)

    def handle_error(self, history, message, action_json):
        """
        Handles the error action by denying user request and providing information about the platform's capabilities.
        Returns a response text.
        """
        response = self.send_message_with_history(history, message)
        if not response:
            response = "Sorry, I couldn't provide help at the moment."  # Fallback response
        
        return response


if __name__ == "__main__":
    while True:
        query = input("Enter your query: ")
        if query.lower() == "exit":
            break
        
        # Example history
        history = [
            {"role": "user", "parts": [{"text": "Hello"}]},
            {"role": "model", "parts": [{"text": "Hi! How can I help you?"}]}
        ]
        
        parser = QueryParser()
        resp = parser.handle_query(query, history)
        print(resp)