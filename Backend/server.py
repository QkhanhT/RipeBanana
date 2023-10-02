from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/members")


def members():
    return {"members": ["user", "pass"]}

if __name__ == "__main__":
    app.run(debug = True)


