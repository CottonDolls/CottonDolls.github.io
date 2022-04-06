import imp
import os
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
import requests
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import datetime
from functools import wraps
from werkzeug.utils import secure_filename

import requests
import pandas as pd

import cloudinary
import cloudinary.uploader
import cloudinary.api

app = Flask(__name__)

app.config['SECRET_KEY'] = 'assignment'
#app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assignment1DB.db'
bcrypt = Bcrypt(app)
#db = SQLAlchemy(app)
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

UPLOAD_FOLDER = 'static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

AIRTABLE_KEY = 'keyl5xokrjV2hQNZz'
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'client-token' in request.headers:
            token = request.headers['client-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            print (token)
            data = jwt.decode(token.strip('"'), app.config['SECRET_KEY'],algorithms='HS256')
            print('token data:',data)
            current_user = data['id']
        
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        
        return f(current_user,*args, **kwargs)

    return decorated

@app.route('/register', methods=['POST'])
def register():
    print('in register')
    rec = request.get_json()
    print (rec)

    u_id = str(uuid.uuid4())
    hashed_password = bcrypt.generate_password_hash(rec['password']).decode('utf-8')

    data ={
      "fields": {
        "u_id": u_id ,
        "UserName": rec['name'],
        "Email" : rec['email'],
        "Password": hashed_password,
        "Type" : rec['type']
      }
    }

    url = 'https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/User'
    headers = {
    'Authorization': 'Bearer '+AIRTABLE_KEY, 'Content-Type': 'application/json'
    }

    r = requests.post(url,json=data,headers=headers)

    print("Status Code:",r.status_code)
    
    resp = r.json()
    print(resp['fields'] )
    if r.status_code == 200:

        return jsonify({"Name": resp['fields']['UserName'] ,"ID": resp['fields']['u_id']})
    else:
        return make_response('Fail to create',401)

@app.route('/login')
def login():
    auth = request.authorization
    print (auth)

    if not auth or not auth.username or not auth.password:
        print ('not auth')
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/tblG4Gox7SQ51AGew?filterByFormula=UserName%3D%22"+auth.username+"%22"
    headers = {
    'Authorization': 'Bearer '+AIRTABLE_KEY, 'Content-Type': 'application/json'
    }

    r = requests.get(url,headers=headers)

    print("Status Code:",r.status_code)

    resp = r.json()
    print(resp)

    try:
        resp['records'][0]
        user_password = resp['records'][0]['fields']['Password']
        recID = resp['records'][0]['id']

        if bcrypt.check_password_hash(user_password, auth.password):#active不用管
            token = jwt.encode({'id' : recID, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
            return jsonify({'token' : token})
    
    except Exception as e:
        print ('can not find')
        return make_response('Could not verify', 401, {'WWW-Authenticate' : e})

@app.route('/user', methods=['GET'])
@token_required
def get_user(current_user):
    print ("token pass")
    headers = {
        'Authorization': 'Bearer '+AIRTABLE_KEY,
    }
    print ('current_user',current_user)
 # use the u_id decode from token as a filter to retrieve a record from Airtable    
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/User/"+current_user

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)
    
    resp = r.json()
    print (resp)
    
    return jsonify(resp['fields'])

@app.route('/plaza',methods=['GET'])
def plaza():
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Plaza"

    headers = {
        'Authorization': 'Bearer '+AIRTABLE_KEY,
    }

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)

    resp = r.json()

    print(resp)

    return jsonify({'back':resp['records']})

@app.route('/factory',methods=['GET'])
def factory():
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Factory"

    headers = {
        'Authorization': 'Bearer '+AIRTABLE_KEY,
    }

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)

    resp = r.json()

    print(resp)

    return jsonify({'back':resp['records']})

@app.route('/factoryInfo/<recID>',methods=['GET'])
def factoryInfo(recID):
    '''
    print (recID)
    return jsonify({'back':'got recID'})
    '''
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Factory/"+recID

    headers = {
        'Authorization': 'Bearer keyl5xokrjV2hQNZz',
    }

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)

    resp = r.json()

    #print(resp)

    rec = resp['fields']['Comments']
    if  rec:
        print ('idssssssssss',rec)
        url2 = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Review"
        r2 = requests.get(url2, headers=headers)
        print("Status Code:",r2.status_code)

        resp2 = r2.json()

        comments = []
        for i in resp2['records']:
            for r in rec:
                if i['id'] == r:
                    comments.append(i['fields'])
                
        print (comments)
    
    else:
        comments = None


    return jsonify({'back':resp['fields'],'comments':comments})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload/doll', methods=['POST'])
def upload_doll():
    rec = request.get_json()
    print (rec)
    return jsonify({'back':'got URl'})
    '''
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Factory"

    headers = {
        'Authorization': 'Bearer '+AIRTABLE_KEY,
    }

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)

    resp = r.json()

    print(resp)

    return jsonify({'back':resp['records']})
    '''

if __name__ == '__main__':
    app.run()