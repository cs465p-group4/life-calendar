from flask import Flask, request, redirect
from flask_cors import CORS, cross_origin
import sys
sys.path.append('..')
import database

app = Flask(__name__)
CORS(app)
model = database.getModel()
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/comment", methods=['GET','POST'])
@cross_origin(origin='localhost')
def comments():
    if(request.method=='POST'):
        data = request.get_json()
        model.insert(data['name'], data['message'])
        print("insert happened")
    else:
        entries = {"name": [], "message": []}
        for row in model.select():
            entries["name"].append(row[0])
            entries["message"].append(row[1])
    return redirect("/", entries=entries)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)