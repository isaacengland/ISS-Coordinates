from flask import Flask, jsonify
from flask_cors import CORS
import requests

# Set up Flask
app = Flask(__name__)
# Set up Flask to bypass CORS at the front end:
cors = CORS(app)


# Create the receiver API POST endpoint
@app.route("/receiver", methods=["POST"])
def postME():
    issPos = "http://api.open-notify.org/iss-now.json"
    posData = requests.get(issPos)
    posData = jsonify(posData)
    return posData


if __name__ == "__main__":
    cors.run()
