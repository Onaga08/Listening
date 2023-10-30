from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_data():
    data = {"message": "Data"}
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
