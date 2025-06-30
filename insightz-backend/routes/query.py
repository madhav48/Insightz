from flask import Blueprint, request, jsonify

query_bp = Blueprint("query", __name__)

@query_bp.route("/api/query", methods=["POST"])
def query():
    user_input = request.json.get("messages")
    # TODO: return clarification questions
    print(request.json)
    return jsonify({
        "message": "Here is the summary so far...",
        "summary": {
            "company": "Apple Inc.",
            "focusAreas": ["Financials", "Growth"],
            "timeframe": "Last 5 years",
            "analysisType": "Investment"
        }
    })


# @query_bp.route("/api/query", methods=["POST"])
# def handle_query():
#     data = request.json
#     messages = data.get("messages", [])  # full conversation history
#     summary = data.get("summary", {})    # current extracted info
#     response, updated_summary = generate_response(messages, summary)
#     return jsonify({"message": response, "summary": updated_summary})