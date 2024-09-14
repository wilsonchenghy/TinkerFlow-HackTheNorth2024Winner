import React, { useState } from "react";
import './css/InputContextPage.css';
import axios from 'axios';
import { AddCircle28Regular } from '@fluentui/react-icons';
import { handleImageUpload } from "./util/image_handling";
import CanvasAnimation from "./ContextCircularPulse";

const InputContextPage = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const [file, setFile] = useState(); 
    const [photo, setPhoto] = useState(); 

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('YOUR_API_ENDPOINT', {
                prompt: input,
                // Add any other parameters required by your API
            });
            setResponse(res.data.choices[0].text); // Adjust this based on your API response structure
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="input-context-page-container">
            <div className="input-context-topic">Enter the components you got! </div>
            <div className="canvas-animation-container">
                <CanvasAnimation />
            </div>
            <div className="input-bar">
                <button className="import-button" onClick={() => handleImageUpload(setFile, setPhoto)}>
                    <AddCircle28Regular/>
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message"
                        className="input"
                    />
                    <button type="submit" className="button">Send</button>
                </form>
                {response && <div className="response">{response}</div>}
            </div>
        </div>
    );
};

export default InputContextPage;
