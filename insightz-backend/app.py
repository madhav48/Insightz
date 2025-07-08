from flask import Flask
from routes.query import query_bp
from routes.generate import generate_bp
from routes.history import history_bp
from routes.download import download_bp
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
app.register_blueprint(query_bp)
app.register_blueprint(generate_bp)
app.register_blueprint(history_bp)
app.register_blueprint(download_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug = True)

