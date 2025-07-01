from flask import Blueprint, request, jsonify
from controllers.query_parser import QueryParser

query_bp = Blueprint("query", __name__)
query_parser = QueryParser()

@query_bp.route("/api/query", methods=["POST"])
def query():
    messages = request.json.get("messages")
    query_summary = request.json.get("summary")
    response = query_parser.handle_query(messages)

    print(response)
    return jsonify({
        "message": response,
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