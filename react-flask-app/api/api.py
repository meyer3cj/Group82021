# from crypt import methods
from flask import Flask,request
import queries

app = Flask(__name__)

# Get requests

# Get entire list for user
@app.route('/<userId>/home', methods=['GET'])
def itemList(userId):
    return queries.getItems(userId)

@app.route('/search/<Term>', methods=['GET'])
def searchItemList(Term):
    return queries.searchItems(Term)

@app.route('/searchBoughtList/<Term>', methods=['GET'])
def searchBoughtList(Term):
    return queries.searchBoughtitems(Term)
@app.route('/searchHistoryList/<Term>', methods=['GET'])
def searchHistoryList(Term):
    return queries.searchHistory(Term)
# Get information for single list item update from database
@app.route('/<userId>/accountInfo', methods=['GET'])
def getAccountInfo(userId):
    return queries.getAccountInfo(userId)

@app.route('/<userId>/<itemId>/item', methods=['GET'])
def getItemList(userId, itemId):
    return queries.getItemList(userId, itemId)

@app.route('/getitemName/<itemName>', methods=['GET'])
def getImagedata(itemName):
    name= itemName
    print ('item name is ' +str(itemName))
    urls = queries.searchImages(name)

    return urls

@app.route('/<userId>/bought', methods=['GET'])
def getBought(userId):
    return queries.getBought(userId)

# Post requests

# Login request to compare with database
@app.route('/login', methods=['POST'])
def login():
    response = request.json
    return queries.login(response)

# Create to add user data to Users table in  database
@app.route('/signup', methods=['POST'])
def signup():
    response = request.json
    return queries.signup(response)

# Add item to database
@app.route('/add', methods=['POST'])
def addItemList():
    response = request.json
    return queries.addItemList(response)

# Send request to update database
@app.route('/<usersId>/<itemId>/edit', methods=['POST'])
def editItemList(usersId, itemId):
    response = request.json
    return queries.editItemList(usersId, itemId, response)

#soft delete, item will be in history but not in the user's main list
@app.route('/<itemId>/remove', methods=['POST'])
def remove(itemId):
    queries.removeItems(itemId)

    return '', 200

@app.route('/<usersId>/updateEmail', methods=['POST'])
def updateEmail(usersId):
    response = request.json
    return queries.updateEmail(usersId, response)

@app.route('/<usersId>/updatePassword', methods=['POST'])
def updatePassword(usersId):
    response = request.json
    return queries.updatePassword(usersId, response)

@app.route('/<itemId>/setBought',methods= ['POST'])
def setBought(itemId):
    queries.setBought(itemId)
    return '', 200
    
@app.route('/<itemId>/setunBought',methods= ['POST'])
def setunBought(itemId):
    queries.setUnbought(itemId)
    return '', 200


# Delete requests

# Delete aa single item from list
@app.route('/<usersId>/<itemId>/deleteItem', methods=['DELETE'])
def delete(usersId, itemId):
    return queries.deleteItems(usersId, itemId)

@app.route('/<usersId>/history', methods=['GET'])
def getHistory(usersId):
    return queries.getHistory(usersId)

@app.route('/<usersId>/deleteAccount', methods=['DELETE'])
def deleteAccount(usersId):
    return queries.deleteAccount(usersId)
