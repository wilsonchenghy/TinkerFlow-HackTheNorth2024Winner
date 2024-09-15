from flask import Flask, request, jsonify
from flask_cors import CORS
import getpass
import os
import json
from langchain_cohere import ChatCohere
from langchain_core.messages import HumanMessage
import http.client
import typing
import urllib.request
from PIL import Image as PIL_Image
from PIL import ImageOps as PIL_ImageOps
import google.ai.generativelanguage as glm

from vertexai.generative_models import(
    GenerationConfig,
    GenerativeModel,
    HarmCategory,
    HarmBlockThreshold,
    Image,
    Part,
)

from google.generativeai.types import HarmCategory, HarmBlockThreshold

import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)





from query_cohere_main import get_project_info_cohere
from groq_cohere_main import get_project_info_groq



@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    contextBoxInput = data.get('contextBoxContent', '')
    useGroq = data.get('useGroq', '')

    print(useGroq)

    if useGroq:
        print("Using Groq")
        sucess_complete = False
        while not sucess_complete:
            # try:
            response = get_project_info_groq(contextBoxInput)
            sucess_complete = True
            # except Exception as error:
            #     print(error)


        # print(response['instruction'])

        print(response['connections'])
        # print(response['components'], '\n\n\n\n')


        # print(response['code'])




        print(f'Received prompt: {contextBoxInput}')
        return jsonify({'message': [response]}), 200 
    else:    
        # objects_using = ["Arduino Nano", "L298N Motor Driver", "DC Motor", "DC Motor", "9V Battery"]
        sucess_complete = False
        while not sucess_complete:
            try:
                response = get_project_info_cohere(contextBoxInput)
                sucess_complete = True
            except Exception as error:
                print(error)


        # print(response['instruction'])

        print(response['connections'])
        # print(response['components'], '\n\n\n\n')


        # print(response['code'])




        print(f'Received prompt: {contextBoxInput}')
        return jsonify({'message': [response]}), 200 






@app.route('/test', methods=["POST", "GET"])
def test(): 
    if request.method == "POST": 
        #print(request.get_json())
        return image_processing(request.get_json()['image_url'])
        #return request.get_json()

def get_image_bytes_from_url(image_url: str) -> bytes:
    with urllib.request.urlopen(image_url) as response:
        response = typing.cast(http.client.HTTPResponse, response)
        image_bytes = response.read()
    return image_bytes


def load_image_from_url(image_url: str) -> Image:
    image_bytes = get_image_bytes_from_url(image_url)
    return Image.from_bytes(image_bytes)

def image_processing(photo_url): 
    genai.configure(api_key=os.environ['API_KEY'])


    #image = load_image_from_url(photo_url)

    blob = glm.Blob(
        mime_type='image/jpeg',
        data=get_image_bytes_from_url(photo_url)
    )
    # # myfile = genai.upload_file(get_image_bytes_from_url(photo_url))
    # print(f"{blob}")

    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content( 
    [blob, "\n\n", "Identify the specific type and model of the electronic component, without other unnecessary text"], safety_settings = {
        HarmCategory.HARM_CATEGORY_HARASSMENT : HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH : HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT : HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT : HarmBlockThreshold.BLOCK_ONLY_HIGH
    })

    print(result.text)
    return jsonify({'hardware' : result.text}), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)





