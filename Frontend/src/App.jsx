import { useState } from 'react'
import axios from 'axios'
import './css/App.css'
import CircuitComponent from './CircuitComponent.jsx';
import InputContextPage from './InputContextPage.jsx';
import InstructionPage from './InstructionPage.jsx';

function App() {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/submit', { prompt });
      console.log('Data sent successfully');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className='AppContainer'>
      <InputContextPage />
      <InstructionPage />
    </div>
  )
}

export default App