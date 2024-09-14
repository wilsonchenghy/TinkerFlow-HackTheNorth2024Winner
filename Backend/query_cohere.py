import getpass
import os
import json
from langchain_cohere import ChatCohere
from langchain_core.messages import HumanMessage


# objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]

def get_project_info(objects_using, api_key = "A3AdtI1axIksKhMN6IG2PpyOharzuF4RV2a6NHgt" ):
    '''get_project_info(objects_using, api_key) -> JSON
    returns  the name descripition and instruction of the project.
    '''

    chat = ChatCohere( cohere_api_key= api_key,
        response_format={"type": "json_object"},
    )


    query1 =  '''
    Given only the following materials: ''' + ', '.join(objects_using) + '''.
    Return a JSON object of the best project to work on with the name, instruction, and connections in the format of: 
    {
        "name": "xxx",
        "description": "xxx",
        "instruction": "xxx",
        "connections": "xxx"
    }
    Connections will be a list showing the connections, in order of the instruction, in the format of "device (connector name) - device (connector name)", with each wire connection seperate.
    The wire position, connector name, and name of object will be specific and in short form (use symbols when applicable, ex positive to +) (Use short form for connector name when applicable, ex Digital Pin 5 to D5) (Use common labeling convention).
    Check for wiring errors and correct them.
    Check all connections name and position are labeled correctly in short form.
    Check all connection format are in "device (connector name) - device (connector name)" and in order of the instruction.
    In instruction refer to all the wire connections in the same format as the connection section.
    '''


    message1 = [HumanMessage(content=query1)]


    response1 = chat.invoke(message1)


    resp1 = json.loads(response1.content)


    query2 = '''
    With only the following materials: ''' + ', '.join(objects_using) + '''.
    Check the following JSON for any errors (wirring, instructions, etc...): ''' + str(resp1) + '''
    Check all connections name and position are labeled correctly in short form.
    Check all connection format are in "device (connector name) - device (connector name)" and in order of the instruction.
    Check the JSON is in the format:
    {
        "name": "xxx",
        "description": "xxx",
        "instruction": "xxx",
        "connections": "xxx"
    }
    Return the corrected version.
    '''
    message2 = [HumanMessage(content=query2)]


    response2 = chat.invoke(message2)

    print(response2)
    resp2 = json.loads(response2.content)

    return resp2
    # print(resp["name"])
    # print(resp["instruction"])


objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]
print(get_project_info(objects_using))
