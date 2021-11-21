from flask import Flask,request
import itemfunctions

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def get_item_list():
    itemfunctions.GetItems()
    
    return('1')
    
@app.route('/del/<id>', methods=['DELETE'])
def delete(id):
    
    itemfunctions.DeleteItems(id)
    get_item_list()

    return('2')

# Add item to database
@app.route('/addItem', methods=['POST'])
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
    
    itemfunctions.updateItemList(id)

    return '', 200



