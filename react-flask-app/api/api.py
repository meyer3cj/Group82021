from flask import Flask,request
import queries

app = Flask(__name__)

## Get requests ##

# Get entire list for user
@app.route('/<userId>/home', methods=['GET'])
def itemList(userId):
    return queries.getItems(userId)

# Get information for single list item update from database
@app.route('/<itemId>/item', methods=['GET'])
def getItemList(itemId):
    return queries.getItemList(itemId)

## Post requests ##

# Login request to compare with database
@app.route('/login', methods=['POST'])
def login():
    response = request.json
    return queries.login(response)

# Signup to add user to database
@app.route('/signup', methods=['POST'])
def signup():
    response = request.json
    return queries.signup(response)

# Add item to database
@app.route('/add', methods=['POST'])
def addItemList():
    response = request.json
    queries.addItemList(response)

    return '', 200

# Send request to update database
@app.route('/<itemId>/edit', methods=['POST'])
def editItemList(itemId):
    response = request.json
    queries.editItemList(itemId, response)

    return '', 200

## Delete requests ##

# Delete aa single item from list
@app.route('/<itemId>/del', methods=['DELETE'])
def delete(itemId):
    queries.deleteItems(itemId)

<<<<<<< HEAD
    return '',200

@app.route('/getitemName/<itemName>', methods=['GET'])
def getImagedata(itemName):
    name= itemName
    print ('item name is ' +str(itemName))
    urls=itemfunctions.SearchImages(name)

    return urls
=======
    return '',200
>>>>>>> faf5eae (Added signup feature. Other changes.)
