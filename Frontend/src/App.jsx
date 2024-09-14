import { useState } from 'react'
import axios from 'axios'
import './App.css'

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
    <div className="App">
      <form className="mainPageSubFormContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="mainPageInput"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Topic"
        />
        <button type="submit" className="mainPageSubmit-button">Submit</button>
      </form>
    </div>
  )
}

export default App

