import { useEffect } from 'react';
import { Letter_Box } from './components/Letterbox';
import GridComponent from './components/Grid'
import Keyboard from './components/Keyboard'
import './App.css'

function App() {
  useEffect(() => {
    Letter_Box();
  }, []);

  return (
    <>
    <h1 className='app-name'>WORD-RUSH</h1>
      <div>
        <GridComponent />
        <Keyboard />
      </div>
    </>
  )
}

export default App
