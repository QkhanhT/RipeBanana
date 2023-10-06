from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from mongodbconnect import client, uri

#add correct database and collection later
db = client["database"]
collection = db["collection"]

def addToDB(self, info):
    return collection.insert_one(info)
