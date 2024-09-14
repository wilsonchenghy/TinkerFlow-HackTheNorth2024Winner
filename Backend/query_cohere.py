import getpass
import os
import json
from langchain_cohere import ChatCohere
from langchain_core.messages import HumanMessage


# objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]

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
    Return the name, description, numbered steps instruction, connection, and components in the following JSON format:
    {
        "name": "xxx",
        "description": "xxx",
        "instruction": "xxx",
        "connections": "xxx"
        "components": "xxx"
    }
    The components value will be an array of all the components used for the build.
    Each wire connection format will be: connection name 1/connection name 2
    For the wire connection format the name of the component will not be mentioned. The name will be simple and accurate form.
    connections value will be formated as a 2D array with each subarray will be corresponding with the components with the same index.
    The subarray will be an array of all the wire connection with the assigned components, including ones mentioned previously.
'''

    chat = ChatCohere( cohere_api_key= api_key,
                # model = "command-r-08-2024",
        response_format={"type": "json_object"},

        chat_history =  [{"role": "User", "message": get_query(["Arduino Nano", "BMP180"])},
                         {"role": "Chatbot", "message": """
                          {
                                "name": "Arduino Rocket Barometric Altimeter",
                                "description": "This project involves building a small device that uses a barometric pressure and temperature sensor to read and record pressure and altitude data of a rocket. The BMP180 sensor is highly precise and can measure barometric pressure from 300 to 1100 hPa, and temperature from -40°C to 85°C with ±1.0°C accuracy. This means that it can be used as an altimeter with ±1 meter accuracy.",
                                "instruction": "1. Connect the 5V VCC Power (Red wire), Ground (Black wire), SDA (Green wire), and SCL (Yellow wire) to the BMP180 Module.
2. Connect the other end of the Ground wire (Black wire) to the Ground pin of the Arduino board.
3. Connect the other end of the 5V VCC Power wire (Red wire) to the 5V power pin of the Arduino board.
4. Connect the other end of the SDA wire (Green wire) to SDA/Analog pin 4 of the Arduino Nano board.
5. Connect the other end of the SCL wire (Yellow wire) to SCL/Analog pin 5 of the Arduino Nano board.",
                                "connections": [
                                    ["5V", "GND", "SCL/A5", "SDA/A4"],
                                    ["5V", "GND", "SCL/A5", "SDA/A4"]
                                ],
                                "components": [
                                    "Arduino Nano",
                                    "BMP180"
                                ]
                            }
"""}
                         ],

        preamble =  message_format,
    )


# streaming ########################

    query1 =  get_query(objects_using)


    message1 = [HumanMessage(content=query1)]


    response1 = chat.invoke(message1)


    resp1 = json.loads(response1.content)


    return resp1
    # print(resp["name"])
    # print(resp["instruction"])


objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]


response = get_project_info(objects_using)

print(response['instruction'])

print(response['connections'])
print(response['components'], '---')
