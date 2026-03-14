import requests

url = "http://127.0.0.1:8000/analyze"

data = {
    "text": "I feel overwhelmed today but hopeful."
}

response = requests.post(url, json=data)

print("STATUS:", response.status_code)
print("RAW RESPONSE:", response.text)