import React, { useState }  from 'react';
import CircuitBoard from './CircuitComponent';
import './css/InstructionPage.css';

const InstructionPage = () => {

    const [instructionContent, setInstructionContent] = useState('1. Prepare the Arduino Nano by connecting it to your computer and installing the Arduino IDE. 2. Set up the L298N Motor Driver: connect the motor power supply (9V Battery) to the driver\'s input voltage pins, and connect the ground. 3. Connect the Arduino Nano to the L298N: link the 5V and GND pins of the Nano to the corresponding pins on the driver. Then, connect Nano digital pins 8, 9, 10, and 11 to the driver\'s input pins (IN1-IN4). 4. Wire the DC Motors: Connect the motors to the L298N\'s output pins (OUT1-OUT4). Ensure the motor\'s polarity matches the desired direction. 5. Upload the Arduino code: A sample code is provided below to control the motors. 6. Power the setup: Connect the 9V Battery to the Arduino Nano\'s VIN pin and ground.');

    return (
        <div className='instruction-page-container'>
            <div className='instruction-topic-container'>
                <div className='instruction-topic'>Instruction Topic</div>
            </div>
            <div className='schematic-container'>
                <CircuitBoard data={[['5V', 'GND', 'D5', 'D6', 'D7'], ['5V', 'GND', 'D1', 'D2'], ['D1', 'D2']]} />
            </div>
            <div className='instruction-content-container'>
                <div>{instructionContent}</div>
            </div>
        </div>
    );
};

export default InstructionPage;