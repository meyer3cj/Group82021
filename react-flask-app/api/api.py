import time
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






 