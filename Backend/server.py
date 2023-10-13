from flask import Flask, render_template, url_for, request, session,redirect, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from cipher import encrypt, decrypt

app = Flask(__name__)
# Configure CORS to allow requests from localhost:3000
cors = CORS(app, resources={"/*": {"origins": "*"}})


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
        
        existing_user = users.find_one({'username' : encrypt(username,2,1)})

        if existing_user is None:
            user_id = users.insert_one({'username': encrypt(username,2,1), 'password': encrypt(password, 5, -1)})
            message = {"message": "account_created", "code": 200}
            return jsonify(message)
        else:        
            print('That username already exists!')
            message = {"message": username, "code": 400}
            return jsonify(message)
    return 'TBD'

@app.route("/", methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('inputUsername')
        password = data.get('inputPassword')
        fetched_user = users.find_one({'username' : encrypt(username,2,1)})
        if fetched_user:
            if fetched_user['password']== encrypt(password, 5, -1):
                print("Login Success")
                message = {"message": "success", "code": 200}
                return jsonify(message)
            else:
                print("Incorrect Password")
                message = {"message": "incorrect_password", "code": 400}
                return jsonify(message)
        else:
            print("Username not found, please sign up")
            message = {"message": "username_not_found", "code": 400}
            return jsonify(message)

if __name__ == "__main__":
    app.run(debug = True)