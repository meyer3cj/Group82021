from flask import Flask,request
import queries

app = Flask(__name__)

## Get requests ##

# Get entire list for user
@app.route('/home/<userId>', methods=['GET'])
def itemList(userId):
    return queries.getItems(userId)

# Get information for single list item update from database
@app.route('/item/<itemId>', methods=['GET'])
def getItemList(itemId):
    return queries.getItemList(itemId)

## Post requests ##

# Login request to compare with database
@app.route('/login', methods=['POST'])
def login():
    response = request.json
    return queries.login(response)

# Add item to database
@app.route('/add', methods=['POST'])
def addItemList():
    response = request.json
    queries.addItemList(response)

    return '', 200

# Send request to update database
@app.route('/edit/<itemId>', methods=['POST'])
def editItemList(itemId):
    response = request.json
    queries.editItemList(itemId, response)

    return '', 200

## Delete requests ##

# Delete aa single item from list
@app.route('/del/<itemId>', methods=['DELETE'])
def delete(itemId):
    queries.deleteItems(itemId)

    return '',200

@app.route('/getitemName/<itemName>', methods=['GET'])
def getImagedata(itemName):
    name= itemName
    print ('item name is ' +str(itemName))
    urls=itemfunctions.SearchImages(name)

    return urls