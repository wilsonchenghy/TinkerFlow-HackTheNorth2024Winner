import React, { useState } from "react";
import './css/InputContextPage.css';
import axios from 'axios';
import { AddCircle28Regular } from '@fluentui/react-icons';
import { handleImageUpload } from "./util/image_handling";
import CanvasAnimation from "./ContextCircularPulse";
import { useDispatch } from 'react-redux';
import { changeInstructionContentAction } from './redux/actions.js';

const InputContextPage = () => {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState('');

    const [file, setFile] = useState(); 
    const [photo, setPhoto] = useState(); 

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/submit', { prompt });
            console.log('Data sent successfully');
            console.log('Response data:', response.data);
            dispatch(changeInstructionContentAction(response.data.message[0]));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [contextBoxContent, changeContextBoxContent] = useState(['Arduino', 'L298N', 'hi'])

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


                const minTop = 230;
                const maxTop = 400;
                const minLeft = 100;
                const maxLeft = 400;

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
                    {item}
                </div>
                );
            })}
            <div className="input-bar">
                <button className="import-button" onClick={() => handleImageUpload(setFile, setPhoto)}>
                    <AddCircle28Regular/>
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={handlePromptChange}
                        placeholder="Type your message"
                        className="input"
                    />
                    <button type="submit" className="button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default InputContextPage;
