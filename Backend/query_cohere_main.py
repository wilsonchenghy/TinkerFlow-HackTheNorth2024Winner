import getpass
import os
import json
from langchain_cohere import ChatCohere
from langchain_core.messages import HumanMessage


# objects_using = ["Arduino Nano", "L298N Motor Driver", "2 DC Motor", "9V Battery"]

def get_query(objects_using):
    return '''
    Given ONLY the following materials: ''' + ', '.join(objects_using) + '''.
    Return a JSON object of the best project to work on with the name, description, instruction, connection, and components. 
    '''

def get_project_info_cohere(objects_using, api_key = "A3AdtI1axIksKhMN6IG2PpyOharzuF4RV2a6NHgt" ):
    '''get_project_info(objects_using, api_key) -> JSON
    returns  the name descripition and instruction of the project.
    '''

    

    personality = 'Have a fun and joking personality, like a comedian, but also detailed and easy to understand in explaining concepts.'
    message_format = '''
    Return the name, description, numbered steps instruction (in a fun way), connection, code, and components in the following JSON format:
    {
        "name": "xxx",
        "description": "xxx",
        "instruction": "xxx",
        "connections": "xxx",
        "components": "xxx",
        "code": "xxx"

    }
    
    The components value will be an array of all the components used for the build. Multilpe of the same component would each take an index.
    Connections will be an array data type not numbered showing the connections, in the exact format of "component;(connector name)$component;(connector name)", with each wire connection seperate. 
    The Component is the same name as the input compenent name, unless there is duplicate then just add a number behind the component name.

    The wire position, connector name, and name of object will be specific and in short form (use symbols when applicable, ex positive to +) (Use short form for connector name when applicable, ex Digital Pin 5 to D5) (Use common labeling convention).
    In instruction refer to all the wire connections in the same format as the connection section.
    The instructions will be an array data type, with each index being a step.
    Do not return any extra text before or after the JSON.
    Output Must Be a pure JSON.
    '''

    chat = ChatCohere( cohere_api_key= api_key,
                # model = "command-r-08-2024",
        response_format={"type": "json_object"},


        preamble =  personality + message_format,
        connectors=[{"id":"web-search"}],
    )


# streaming ########################

    query1 =  get_query(objects_using)


    message1 = [HumanMessage(content=query1)]


    response1 = chat.invoke(message1)

    print(response1.content)
    # resp1_cont =response1.content

    # resp1_cont =  resp1_cont[resp1_cont.find('{'): resp1_cont[resp1_cont.find('{'):].find('```') + 1]

    # print(resp1_cont)
    # resp1 = json.loads(resp1_cont)
    resp1 = json.loads(str(response1.content))

    # process the connections
    all_components = []
    all_connections = []
    for connection in resp1["connections"]:
        connection_point1, connection_point2 = connection.split("$")

        name1, connector_name1 = connection_point1.split(";")
        name2, connector_name2 = connection_point2.split(";")

        if name1 not in all_components:
            all_components.append(name1)
            all_connections.append([])


        if name2 not in all_components:
            all_components.append(name2)
            all_connections.append([])


        combo_name = connector_name1 + "/" + connector_name2

        # print(all_components, all_components.index(name2))

        all_connections[all_components.index(name1)].append(combo_name)
        all_connections[all_components.index(name2)].append(combo_name)



        
        

    resp1["connections"] = all_connections

    resp1["components"] = all_components


        # name1, connector_name = connection_point1.split("-")


    return resp1
    # print(resp["name"])
    # print(resp["instruction"])


# objects_using = ["Arduino Nano", "L298N Motor Driver", "DC Motor", "DC Motor", "9V Battery"]


# response = get_project_info(objects_using)

# print(response['instruction'])

# print(response['connections'])
# print(response['components'], '\n\n\n\n')


# print(response['code'])
