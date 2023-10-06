# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# import pymongo
# # Replace the placeholder with your Atlas connection string
# uri = "mongodb+srv://ripebanana582:k91ciU1pGyccvRNi@userlogin.qczqbbg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
# # Set the Stable API version when creating a new client
# client = MongoClient(uri, server_api=ServerApi('1'))
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# db = client.RipeBanana
# users = db.users
# import datetime
# personDocument = {
#   "name": "Omar",
#   "password": "pass"}
 
# users.insert_one(personDocument)           