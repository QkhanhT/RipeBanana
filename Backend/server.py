from flask import Flask, render_template, url_for, request, session,redirect
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)

# Replace the placeholder with your Atlas connection string
uri = "mongodb+srv://ripebanana582:k91ciU1pGyccvRNi@userlogin.qczqbbg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
# Set the Stable API version when creating a new client
client = MongoClient(uri, server_api=ServerApi('1'))

@app.route("/signup", methods = ['POST', 'GET'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        print(username)
        password = data.get('password')
        print(password)
        
        # Do something with button_pressed
        # For example, you can print it to the console
        db = client.RipeBanana
        users = db.users
        existing_user = users.find_one({'username' : username})

        if existing_user is None:
            # hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : username, 'password' : password})
        
        return 'That username already exists!'
    return ''

if __name__ == "__main__":
    app.run(debug = True)


