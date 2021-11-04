import time
from flask import Flask
import db
import selectItems
app = Flask(__name__)

@app.route('/time')
def get_current_time():
    selectItems.GetItems()



 