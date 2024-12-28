from flask import Flask, request, jsonify,render_template
import google.generativeai as genai
from dotenv import load_dotenv
import os
import re

load_dotenv()
app = Flask(__name__)
genai.configure(api_key=os.environ["API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def index():
    return render_template('index1.html')


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    if user_message:
      try:
        response = model.generate_content(user_message)
        return jsonify({'response': response.text})
      except Exception as error:
          return jsonify({'error': str(error)}), 500

    else:
        return jsonify({'error': 'No message provided'}), 400
if __name__ == '__main__':
    app.run(debug=True)