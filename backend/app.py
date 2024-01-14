from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
# import wandb
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('input', '')

    message=[
        {"role": "system", "content": "You answer question for a Senior Data Engineer"}, 
        {"role": "user", "content": user_input}
    ]
    temperature=0
    max_tokens=256*4
    frequency_penalty=0

    try:
        response = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=message,
            temperature=temperature,
            max_tokens=max_tokens,
            frequency_penalty=frequency_penalty
        )

        bot_message = response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error from OpenAI API: {e}")
        bot_message = f"Error from OpenAI API: {e}"

    return jsonify({'message': bot_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)