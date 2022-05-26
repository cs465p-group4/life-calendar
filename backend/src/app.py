from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import json

import sys # is there a better way to do this?
sys.path.append('..')
import database 

app = Flask(__name__)
CORS(app)
model = database.get_model()
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/comments", methods=['GET','POST'])
@cross_origin(origin='localhost')
def comment():
    if(request.method=='POST'):
        print("In post")
        if(request.data):
            data = request.get_json()
            model.insert(data['name'], data['comment'])
        return 'OK'

    elif(request.method=='GET'):
        print("in GET")
        entries = [dict(name=row[0], comment=row[1], date=row[2]) for row in model.select()]
        #print("app.py result: ", entries)
        newEntries = json.dumps(entries)
        return newEntries
            
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)