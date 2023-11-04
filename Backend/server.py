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
hardwareSets = db.hardwareSets
userProjects = db.userProjects

@app.route("/signup", methods = ['POST', 'GET'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        confirmPassword = data.get('confirmPassword')
        
        if password != confirmPassword:
            #Return the return message (parse as json)
            message = {"message": "passwords_not_match", "code": 300}
            return jsonify(message)
        
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
                # projects = []
                # sets = []
                # for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                #     projects.append(x)
                # for x in hardwareSets.find({}, {"_id": 0, "name" : 1, "capacity" : 1}):
                #     sets.append(x)
                # print(sets)
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



@app.route("/dashboard/checkin/hw1", methods = ['POST', 'GET'])          
def checkinHW1():
    if request.method == 'POST':
        data = request.get_json()
        checkInValue = int(data.get('valueHW1'))
        set = hardwareSets.find_one({'name' : 'HardwareSet 1'})
        project = userProjects.find_one({'name' : data.get('projectId')})

        availability = int(set['availability'])
        capacity = int(set['capacity'])
        if(availability + checkInValue <= capacity and int(project['hardware1']) - checkInValue >= 0): #If enough hardware to checkin and doesnt exceed capacity
            availability = availability + checkInValue
            hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : availability}})
            print("Checkin successful")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware1' : int(project['hardware1']) - checkInValue}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "success", "projects": projects, "code": 200}
            return jsonify(message)
        elif (availability + checkInValue > capacity and int(project['hardware1']) - checkInValue >= 0): #If enough hardware to checkin but exceeds capacity
            hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : 100}})
            print("Checkin successful however exceeds capacity")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware1' : int(project['hardware1']) - (capacity - availability)}}) 
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "partial success", "projects": projects, "code": 200}
            return jsonify(message)
        elif (int(project['hardware1']) - checkInValue < 0): #If not enough hardware to checkin
            print("Checkin unsuccessful, you do not have enough hardware to checkin")
            message = {"message": "failed", "code": 400}
            return jsonify(message)



@app.route("/dashboard/checkout/hw1", methods = ['POST', 'GET'])
def checkoutHW1():
    if request.method == 'POST':
        data = request.get_json()
        checkOutAmount = int(data.get('valueHW1'))
        set = hardwareSets.find_one({'name' : 'HardwareSet 1'})
        project = userProjects.find_one({'name' : data.get('projectId')})

        availability = int(set['availability'])
        if availability == 0:
            print("Checkout failed, no hardware available")
            message = {"message": "failed", "code": 400}
            return jsonify(message)
        elif(availability > checkOutAmount):
            availability = availability - checkOutAmount
            hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : availability}})
            print("Checkout successful")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware1' : int(project['hardware1']) + checkOutAmount}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "success", "projects": projects, "code": 200}
            return jsonify(message)
        else:
            hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : 0}})
            print("Checkout successful, however not enough hardware availableto give you the full amount")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware1' : int(project['hardware1']) + availability}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "partial success", "projects": projects, "code": 200}
            return jsonify(message)

@app.route("/dashboard/checkin/hw2", methods = ['POST', 'GET'])          
def checkinHW2():
    if request.method == 'POST':
        data = request.get_json()
        checkInValue = int(data.get('valueHW2'))
        set = hardwareSets.find_one({'name' : 'HardwareSet 2'})
        project = userProjects.find_one({'name' : data.get('projectId')})

        availability = int(set['availability'])
        capacity = int(set['capacity'])
        if(availability + checkInValue <= capacity and int(project['hardware2']) - checkInValue >= 0): #If enough hardware to checkin and doesnt exceed capacity
            availability = availability + checkInValue
            hardwareSets.update_one({'name' : 'HardwareSet 2'}, {"$set": {'availability' : availability}})
            print("Checkin successful")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware2' : int(project['hardware2']) - checkInValue}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "success", "projects": projects, "code": 200}
            return jsonify(message)
        elif (availability + checkInValue > capacity and int(project['hardware2']) - checkInValue >= 0): #If enough hardware to checkin but exceeds capacity
            hardwareSets.update_one({'name' : 'HardwareSet 2'}, {"$set": {'availability' : 100}})
            print("Checkin successful however exceeds capacity")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware2' : int(project['hardware2']) - (capacity - availability)}}) 
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "partial success", "projects": projects, "code": 200}
            return jsonify(message)
        elif (int(project['hardware2']) - checkInValue < 0): #If not enough hardware to checkin
            print("Checkin unsuccessful, you do not have enough hardware to checkin")
            message = {"message": "failed", "code": 400}
            return jsonify(message)


@app.route("/dashboard/checkout/hw2", methods = ['POST', 'GET'])
def checkoutHW2():
    if request.method == 'POST':
        data = request.get_json()
        checkOutAmount = int(data.get('valueHW2'))
        set = hardwareSets.find_one({'name' : 'HardwareSet 2'})
        project = userProjects.find_one({'name' : data.get('projectId')})

        availability = int(set['availability'])
        if availability == 0:
            print("Checkout failed, no hardware available")
            message = {"message": "failed", "code": 400}
            return jsonify(message)
        elif(availability > checkOutAmount):
            availability = availability - checkOutAmount
            hardwareSets.update_one({'name' : 'HardwareSet 2'}, {"$set": {'availability' : availability}})
            print("Checkout successful")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware2' : int(project['hardware2']) + checkOutAmount}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "success", "projects": projects, "code": 200}
            return jsonify(message)
        else:
            hardwareSets.update_one({'name' : 'HardwareSet 2'}, {"$set": {'availability' : 0}})
            print("Checkout successful, however not enough hardware availableto give you the full amount")
            userProjects.update_one({'name' : data.get('projectId')}, {"$set": {'hardware2' : int(project['hardware2']) + availability}})
            
            projects = []
            for x in userProjects.find({}, {"_id": 0, "name" : 1, "hardware1" : 1, "hardware2" : 1}):
                projects.append(x)
            message = {"message": "partial success", "projects": projects, "code": 200}
            return jsonify(message)

@app.route("/dashboard/create", methods = ['POST', 'GET'])
def createProject():
    if request.method == 'POST':
        data = request.get_json()
        projectName = data.get('inputName')
        projectID = data.get('inputProjID')
        description = data.get('inputDesc')
        
        existing_project = userProjects.find_one({'projectID' : projectID})

        if existing_project is None:
            project = {'name' : projectName, 'projectID' : projectID, 'description' : description, 'hardware1' : 0, 'hardware2' : 0}
            userProjects.insert_one(project)
            sets = []
            for x in hardwareSets.find({}, {"_id": 0, "name" : 1, "capacity" : 1}):
                sets.append(x)
            sendproject = {'name' : project['name'], 'projectID' : project['projectID'], 'description' : project['description'], 'hardware1' : project['hardware1'], 'hardware2' : project['hardware2']}
            print(sets)
            print(sendproject)
            message = {"message": "project_created", "projects": sendproject, "sets": sets, "code": 200}
            return jsonify(message)
        else:
            print('The project already exists!')
            message = {"message": projectName, "code": 400}
            return jsonify(message)

@app.route("/dashboard/join", methods = ['POST', 'GET'])
def joinProject():
    if request.method == 'POST':
        data = request.get_json()
        projectID = data.get('existProjID')
        sets = []
        existing_project = userProjects.find_one({'projectID' : projectID})
        project = {'name' : existing_project['name'], 'projectID' : existing_project['projectID'], 'description' : existing_project['description'], 'hardware1' : existing_project['hardware1'], 'hardware2' : existing_project['hardware2']}
        print(project)
        for x in hardwareSets.find({}, {"_id": 0, "name" : 1, "capacity" : 1}):
             sets.append(x)

        if existing_project is None:
            print("Project doesn't exist!")
            message = {"message": "project_not_found", "code": 400}
            return jsonify(message)
        else:
            if projectID == existing_project['projectID']:
                print("Successfully joined!")
                message = {"message": "success", "project": project, "sets": sets, "code": 200}
                return jsonify(message)
            else:
                print("Wrong projectID!")
                message = {"message" : "wrong_projectID", "code" : 400}
                return jsonify(message)


if __name__ == "__main__":
    app.run(debug = True)