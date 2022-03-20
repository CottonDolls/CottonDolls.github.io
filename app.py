from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
import requests
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import datetime
from functools import wraps

import requests
import pandas as pd

app = Flask(__name__)

app.config['SECRET_KEY'] = 'assignment'
#app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assignment1DB.db'
bcrypt = Bcrypt(app)
#db = SQLAlchemy(app)
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


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
            print(data)
            current_user = data['u_id']
        
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        
        return f(current_user,*args, **kwargs)

    return decorated

@app.route('/test',methods=['GET'])
def test():   
    return jsonify('Got it')

@app.route('/bktext',methods=['GET'])
def bktest():
    print('in function')
    data  = [
        {'title':'第一天','img':'https://img0.baidu.com/it/u=470859303,439764315&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'},
        {'title':'第二天','img':'https://img0.baidu.com/it/u=4214525019,2565644538&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
    ]

    return jsonify({'back':data})

@app.route('/plaza',methods=['GET'])
def plaza():
    url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/Plaza"

    headers = {
        'Authorization': 'Bearer keyfeHpNoj99MQRfv',
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
        'Authorization': 'Bearer keyfeHpNoj99MQRfv',
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
        'Authorization': 'Bearer keyfeHpNoj99MQRfv',
    }

    r = requests.get(url, headers=headers)
    print("Status Code:",r.status_code)

    resp = r.json()

    print(resp)

    return jsonify({'back':resp['fields']})
    

if __name__ == '__main__':
    app.run()