import time
from flask import Flask
import db
app = Flask(__name__)

@app.route('/time')
def get_current_time():
    result =db.queryDB("Select * from [test]")
    return {"time": result}