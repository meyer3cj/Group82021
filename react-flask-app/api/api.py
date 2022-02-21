from flask import Flask,request
import itemfunctions

app = Flask(__name__)

# Get requests
# Get entire list for user
@app.route('/home', methods=['GET'])
def itemList():
    return itemfunctions.getItems()

@app.route('/search/<Term>', methods=['GET'])
def searchItemList(Term):
    return itemfunctions.searchItems(Term)

@app.route('/searchBoughtList/<Term>', methods=['GET'])
def searchBoughtList(Term):
    return itemfunctions.searchBoughtitems(Term)
@app.route('/searchHistoryList/<Term>', methods=['GET'])
def searchHistoryList(Term):
    return itemfunctions.searchHistory(Term)
# Get information for single list item update from database
@app.route('/item/<itemId>', methods=['GET'])
def getItemList(itemId):
    return itemfunctions.getItemList(itemId)

# Post requestsj
# Add item to database
@app.route('/add', methods=['POST'])
def addItemList():
    response = request.json
    itemfunctions.addItemList(response)

    return '', 200

# Send request to update database
@app.route('/edit/<itemId>', methods=['POST'])
def editItemList(itemId):
    response = request.json
    itemfunctions.editItemList(itemId, response)

    return '', 200

#soft delete, item will be in history but not in the user's main list
@app.route('/remove/<itemId>', methods=['POST'])
def remove(itemId):
    itemfunctions.removeItems(itemId)

    return '', 200

# Delete requests
# Delete aa single item from list
@app.route('/del/<itemId>', methods=['DELETE'])
def delete(itemId):
    itemfunctions.deleteItems(itemId)

    return '', 200

@app.route('/getitemName/<itemName>', methods=['GET'])
def getImagedata(itemName):
    name= itemName
    print ('item name is ' +str(itemName))
    urls=itemfunctions.SearchImages(name)

    return urls

@app.route('/bought', methods=['GET'])
def getBought():
    return itemfunctions.getBought()

@app.route('/history', methods=['GET'])
def getHistory():
    return itemfunctions.getHistory()

@app.route('/setBought/<itemId>',methods= ['POST'])
def setBought(itemId):

    itemfunctions.setBought(itemId)
    return '', 200
@app.route('/setunBought/<itemId>',methods= ['POST'])
def setunBought(itemId):

    itemfunctions.setUnbought(itemId)
    return '', 200
