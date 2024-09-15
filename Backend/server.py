from flask import Flask, request, jsonify
from flask_cors import CORS
import getpass
import os
import json
from langchain_cohere import ChatCohere
from langchain_groq import ChatGroq
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



def get_query(objects_using):
    return '''
    Given only the following materials: ''' + ', '.join(objects_using) + '''.
    Return a JSON object of the best project to work on with the name, description, instruction, connection, and components. 
    
    '''

def get_project_info(objects_using, api_key = "A3AdtI1axIksKhMN6IG2PpyOharzuF4RV2a6NHgt" ):
    '''get_project_info(objects_using, api_key) -> JSON
    returns  the name descripition and instruction of the project.
    '''

    

    message_format = '''
    Return the name, description, numbered steps instruction, connection, code, and components in the following JSON format:
    {
        "name": "xxx",
        "description": "xxx",
        "instruction": "xxx",
        "connections": "xxx",
        "components": "xxx",
        "code": "xxx"

    }
    The instructions will be an array data type, with each index being a step.
    The components value will be an array of all the components used for the build. Multilpe of the same component would each take an index.
    Connections will be an array data type not numbered showing the connections, in order of the instruction, in the format of "component:(connector name)/component:(connector name)", with each wire connection seperate.
    The wire position, connector name, and name of object will be specific and in short form (use symbols when applicable, ex positive to +) (Use short form for connector name when applicable, ex Digital Pin 5 to D5) (Use common labeling convention).
    In instruction refer to all the wire connections in the same format as the connection section.
    '''

    chat = ChatCohere( cohere_api_key= api_key,
                # model = "command-r-08-2024",
        response_format={"type": "json_object"},


        preamble =  message_format,
        connectors=[{"id":"web-search"}],
    )


# streaming ########################

    query1 =  get_query(objects_using)


    message1 = [HumanMessage(content=query1)]


    response1 = chat.invoke(message1)


    resp1 = json.loads(response1.content)

    # process the connections
    all_components = []
    all_connections = []
    for connection in resp1["connections"]:
        connection_point1, connection_point2 = connection.split("/")

        name1, connector_name1 = connection_point1.split(":")
        name2, connector_name2 = connection_point2.split(":")

        if name1 not in all_components:
            all_components.append(name1)
            all_connections.append([])


        if name2 not in all_components:
            all_components.append(name2)
            all_connections.append([])


        combo_name = connector_name1 + "/" + connector_name2

        print(all_components, all_components.index(name2))

        all_connections[all_components.index(name1)].append(combo_name)
        all_connections[all_components.index(name2)].append(combo_name)



        
        

    resp1["connections"] = all_connections

    resp1["components"] = all_components


        # name1, connector_name = connection_point1.split("-")


    return resp1
    # print(resp["name"])
    # print(resp["instruction"])




@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    contextBoxInput = data.get('contextBoxContent', '')



    objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]

    response = get_project_info(objects_using)

    # print(response['instruction'])

    # print(response['connections'])
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





