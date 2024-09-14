import React  from 'react';
import CircuitBoard from './CircuitComponent';
import './css/InstructionPage.css';

const InstructionPage = () => {
    return (
        <div className='instruction-page-container'>
            <div className='notes-topic'>
                <h1>Instruction Topic</h1>
            </div>
            <div className='schematic-container'>
                <CircuitBoard data={[['5V', 'GND', 'D5', 'D6', 'D7'], ['5V', 'GND', 'D1', 'D2'], ['D1', 'D2']]} />
            </div>
        </div>
    );
};

export default InstructionPage;