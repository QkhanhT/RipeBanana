from flask import Flask, render_template, url_for, request, session,redirect
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
# Configure CORS to allow requests from localhost:3000
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000/"}})


# Replace the placeholder with your Atlas connection string
uri = "mongodb+srv://ripebanana582:k91ciU1pGyccvRNi@userlogin.qczqbbg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
# Set the Stable API version when creating a new client
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.RipeBanana
users = db.users

@app.route("/signup", methods = ['POST', 'GET'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        existing_user = users.find_one({'username' : username})

        if existing_user is None:
            user_id = users.insert_one({'username': username, 'password': password})
            return 'Account Created'
        else:        
            print('That username already exists!')
            return 'Username already exists'
    return 'TBD'

if __name__ == "__main__":
    app.run(debug = True)


