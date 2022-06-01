from flask import Flask, request, redirect
from flask_cors import CORS, cross_origin
import json
import sys
sys.path.append('..')
import database

app = Flask(__name__)
CORS(app)
model = database.get_model()
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/comments", methods=['GET','POST'])
@cross_origin(origin='localhost')
def comments():
    if(request.method=='POST'):
        data = request.get_json()
        model.insert(data['name'], data['comment'])
        return 'OK'
    else:
        print("In GET")
        entries = [dict(name=row[0], message=row[1], date=row[2]) for row in model.select()]
        response = json.dumps(entries)
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)