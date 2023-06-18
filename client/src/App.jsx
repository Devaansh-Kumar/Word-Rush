import { useState } from 'react'
import { useEffect } from 'react';
import { Letter_Box } from './components/letterbox';
import GridComponent from './components/grid'
import Keyboard from './components/keyboard'
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
