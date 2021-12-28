from flask import Flask,request
import itemfunctions

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def itemList():
    return itemfunctions.GetItems()
    
    
@app.route('/del/<id>', methods=['DELETE'])
def delete(id):
    
    itemfunctions.DeleteItems(id)
    itemList()

    return '',200

# Add item to database
@app.route('/add', methods=['POST'])
def addItemList():
    response = request.json
    itemfunctions.addItemList(response)

    return '', 200

# Send request to update database
@app.route('/edit/<id>', methods=['POST'])
def editItemList(id):
    response = request.json
    itemfunctions.editItemList(id, response)

    return '', 200

# Get information for single list item update from database
@app.route('/update/<id>', methods=['GET'])
def getItemList(id):
    return itemfunctions.updateItemList(id)



