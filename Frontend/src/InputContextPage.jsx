import React, { useEffect, useState } from "react";
import './css/InputContextPage.css';
import axios from 'axios';
import { DismissCircle20Regular } from "@fluentui/react-icons";
import { AddCircle28Regular, FastAcceleration24Regular, Star28Regular } from '@fluentui/react-icons';
import CanvasAnimation from "./ContextCircularPulse";
import { useDispatch } from 'react-redux';
import { changeInstructionContentAction, changeInstructionTitleAction, changeSchemeticAction, changeComponentNamesAction, changeIsLoadingAction } from './redux/actions.js';

const InputContextPage = () => {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState('');

    const handlePromptChange = (e) => {
        e.preventDefault();
        setPrompt(e.target.value);
    };

    const addContextBoxContent = (e) => {
        e.preventDefault();
        setContextBoxContent(prevContent => [...prevContent, prompt]);
        setPrompt('');
        const updatedContent = [...contextBoxContent, prompt];
        handleSubmit(updatedContent);
    }

    const handleSubmit = async (updatedContent) => {
        dispatch(changeIsLoadingAction(true));
        try {
            const response = await axios.post('http://localhost:5001/submit', { contextBoxContent: updatedContent, useGroq: useGroq });
            console.log('Data sent successfully');
            console.log('Response data:', response.data);
            dispatch(changeInstructionContentAction(response.data.message[0].instruction));
            dispatch(changeInstructionTitleAction(response.data.message[0].name));
            dispatch(changeSchemeticAction(response.data.message[0].connections));
            dispatch(changeComponentNamesAction(response.data.message[0].components));
            dispatch(changeIsLoadingAction(false));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [contextBoxContent, setContextBoxContent] = useState(['Motor', 'L298N'])

    const handleImageUpload = async () => {
        var file = null;
        var input = document.createElement('input');
        input.type = 'file';
    
        input.onchange = async (e) => { 
            file = e.target.files[0]; 
            console.log("ddd");
            console.log("File ", file); 
            var reader = new FileReader(); 
            reader.addEventListener("load", async () => {
              const data_url = reader.result;
              console.log(data_url);
              try {
                const response = await axios.post("http://localhost:5001/test", {'image_url': data_url});
                console.log('File uploaded successfully');
                console.log('Response data:', response.data);
                setContextBoxContent(prevContent => [...prevContent, response.data.hardware]);
                const latestContent = [...contextBoxContent, response.data.hardware];
                handleSubmit(latestContent);
              } catch (error) {
                console.error('Error uploading file:', error);
            }
            })
            reader.readAsDataURL(file); 
            //console.log(data_url);
        }
    
        input.click();
    };

    const [useGroq, setUseGroq] = useState(false);
    const toggleGroq = () => {
        setUseGroq(!useGroq);
    }

    return (
        <div className="input-context-page-container">
            <div className="input-context-topic">Enter the components you got! </div>
            <div className="canvas-animation-container">
                <CanvasAnimation />
            </div>
            {contextBoxContent.map((item, index) => {
                // Define constants within the map function
                const circleDiameter = 200;
                const circleRadius = circleDiameter / 2;
                const leftPosition = circleRadius - 75; 

                const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


                const minTop = 280;
                const maxTop = 480;
                const minLeft = 150;
                const maxLeft = 350;

                // Generate random values within the specified range
                const randomTop = getRandomInRange(minTop, maxTop);
                const randomLeft = getRandomInRange(minLeft, maxLeft);
                
                return (
                <div
                    key={index}
                    className="context-box-content"
                    style={{
                    position: 'absolute',
                    top: `${randomTop}px`, // Use random top position within range
                    left: `${randomLeft}px`, // Use calculated left position
                    }}
                >
                    <button style={{position: 'relative', top: -6, left: -4, borderWidth: 0}}  className="delete-icon" 
                        onClick={() => {const filtered_array = contextBoxContent.filter((_, cur_index) => cur_index !== index); 
                            setContextBoxContent(filtered_array);
                            handleSubmit(filtered_array); 
                       }}>
                        <DismissCircle20Regular style={{position: 'relative', top: -3, left: -7.25}} />
                        {/* <span className="icon"></span> Unicode for trash can */}
                    </button>
                    {item}
                </div>
                );
            })}
            <div className="input-bar">
                <button className="import-button" onClick={() => toggleGroq()}>
                    {useGroq ? (<FastAcceleration24Regular/>) : (<Star28Regular/>)}
                </button>
                <button className="import-button" onClick={() => handleImageUpload()}>
                    <AddCircle28Regular/>
                </button>
                <form onSubmit={addContextBoxContent}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={handlePromptChange}
                        placeholder="Type your message"
                        className="input"
                    />
                    <button type="submit" className="button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default InputContextPage;
