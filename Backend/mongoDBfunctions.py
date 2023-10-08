from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


from mongodbconnect import client, uri
from structs import userAccount, accountList

#add correct database and collection later
db = client["UserLogin"]
collection = db["Users"]

def addToDB(account): 
    dictInfo = account.convertToDictionary()
    return collection.insert_one(dictInfo)

def returnData():
    #Fetch from database (for each account in database)
    data = collection.find()
    listOfAccs = []
    for acc in data:
        account = acc(acc["name"], acc["password"])
        listOfAccs.append(account)
    return listOfAccs

def returnJson():
    return collection.find()

#Test code to add a user
#account1 = userAccount("user1", "12345abc")
#addToDB(account1)
#print("added user1")
