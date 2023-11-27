from flask import Flask, render_template, url_for, request, session,redirect, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pytest_check as check
from cipher import encrypt

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

def test_add_user_to_database():
    username = 'Abhay Samant'
    password = 'Temp123'
    user_id = users.insert_one({'username': encrypt(username,2,1), 'password': encrypt(password, 5, -1)})
    existing_user = users.find_one({'username' : encrypt(username,2,1)})
    # Enter code to check returned value
    check.equal(existing_user['username'], 'Abhay Samant')

def test_initialize_hwdatabase():
    capacity = 100
    
    hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : capacity}})
    hardwareSets.update_one({'name' : 'HardwareSet 2'}, {"$set": {'availability' : capacity}})

    set1 = hardwareSets.find_one({'name' : 'HardwareSet 1'})
    set2 = hardwareSets.find_one({'name' : 'HardwareSet 2'})

    avail1 = int(set1['availability'])
    avail2 = int(set2['availability'])
    
    check.equal(200, avail1 + avail2)


def test_create_new_project():
    projID = "P123"
    
    project = {'name' : "P123", 'projectID' : projID, 'description' : "...", 'hardware1' : 0, 'hardware2' : 0}
    userProjects.insert_one(project)
    existing_project = userProjects.find_one({'projectID' : projID})
    check.equal(projID, existing_project['projectID'])

def test_checkout_hw1():
   
    projID = "P123"
    project = userProjects.find_one({'name' : data.get('name')})
    availability = int(set['availability'])
    flag = 0
    n1 = 15000
    if availability == 0:
        flag = 1
    elif(availability >= n1):
        availability = availability - n1
        hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : availability}})
        userProjects.update_one({'name' : data.get('name')}, {"$set": {'hardware1' : int(project['hardware1']) + checkOutAmount}})    
        project = userProjects.find_one({'name' : projID})
        project = {'name' : project['name'], 'projectID' : project['projectID'], 'description' : project['description'], 'hardware1' : project['hardware1'], 'hardware2' : project['hardware2']}
        for x in hardwareSets.find({}, {"_id": 0, "name" : 1, "availability": 1, "capacity" : 1}):
            sets.append(x)
            message = {"message": "success", "project": project, "sets": sets, "code": 200}
            return jsonify(message)
        flag = 0
    else:
        hardwareSets.update_one({'name' : 'HardwareSet 1'}, {"$set": {'availability' : 0}})
        print("Checkout successful, however not enough hardware availableto give you the full amount")
        userProjects.update_one({'name' : data.get('name')}, {"$set": {'hardware1' : int(project['hardware1']) + availability}})    
        project = userProjects.find_one({'name' : data.get('name')})
        project = {'name' : project['name'], 'projectID' : project['projectID'], 'description' : project['description'], 'hardware1' : project['hardware1'], 'hardware2' : project['hardware2']}

        sets = []
        for x in hardwareSets.find({}, {"_id": 0, "name" : 1, "availability": 1, "capacity" : 1}):
            sets.append(x)
        flag = 1

    check.equal(flag, 1)

def test_query_available_hw1():
    set = hardwareSets.find_one({'name' : 'HardwareSet 1'})
    availability = int(set['availability'])
    
    check.equal(type(availability), int)
