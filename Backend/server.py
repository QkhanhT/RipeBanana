from flask import Flask
from flask_cors import CORS
from mongoDBfunctions import returnData
from structs import userAccount, accountList


app = Flask(__name__)
CORS(app)

@app.route("/members")


def members():
    listOfAccs = returnData()
    dictList = []
    for acc in listOfAccs:
        dictList.append(acc.convertToDictionary())
        
    return {dictList}

if __name__ == "__main__":
    app.run(debug = True)


