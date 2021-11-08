import time
from flask import Flask
import readdb
import itemfunctions
import deleteItemsdb
app = Flask(__name__)

@app.route('/')
def get_current_time():
    itemfunctions.GetItems()
    return('1')
@app.route('/del/<id>', methods=['DELETE'])
def delete(id):
    itemfunctions.DeleteItems(id)
    return('2')



 