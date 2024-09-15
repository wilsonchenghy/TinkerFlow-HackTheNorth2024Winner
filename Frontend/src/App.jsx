import { useState } from 'react'
import axios from 'axios'
import './css/App.css'
import CircuitComponent from './CircuitComponent.jsx';
import InputContextPage from './InputContextPage.jsx';
import InstructionPage from './InstructionPage.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <div className='AppContainer'>
        <InputContextPage />
        <InstructionPage />
      </div>
    </Provider>
  )
}

export default App