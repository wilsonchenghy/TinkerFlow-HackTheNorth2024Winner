from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    prompt = data.get('prompt', '')
    print(f'Received prompt: {prompt}')
    return jsonify({'message': [prompt]}), 200 

if __name__ == '__main__':
    app.run(port=5001, debug=True)
