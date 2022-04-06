from flask import Flask, request, jsonify, make_response
import requests

url = "https://api.airtable.com/v0/appYTQ3wqtGFV1bI7/tblG4Gox7SQ51AGew?filterByFormula=UserName%3D%22test%22"

headers = {
'Authorization': 'Bearer keyl5xokrjV2hQNZz', 'Content-Type': 'application/json'
}

r = requests.get(url,headers=headers)

print("Status Code:",r.status_code)

resp = r.json()
print(resp['records'][0]['fields']['Password'])