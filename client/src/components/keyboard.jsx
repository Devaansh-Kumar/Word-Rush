import React from 'react';

const Keyboard = () => {
  return (
    <div id="keyboard">
      <div className="first-row">
        <button className="keyboard-button">Q</button>
        <button className="keyboard-button">W</button>
        <button className="keyboard-button">E</button>
        <button className="keyboard-button">R</button>
        <button className="keyboard-button">T</button>
        <button className="keyboard-button">Y</button>
        <button className="keyboard-button">U</button>
        <button className="keyboard-button">I</button>
        <button className="keyboard-button">O</button>
        <button className="keyboard-button">P</button>
        <button className="keyboard-button">Backspace</button>
      </div>
      <div className="second-row">
        <button className="keyboard-button">A</button>
        <button className="keyboard-button">S</button>
        <button className="keyboard-button">D</button>
        <button className="keyboard-button">F</button>
        <button className="keyboard-button">G</button>
        <button className="keyboard-button">H</button>
        <button className="keyboard-button">J</button>
        <button className="keyboard-button">K</button>
        <button className="keyboard-button">L</button>
      </div>
      <div className="third-row">
        <button className="keyboard-button">Delete</button>
        <button className="keyboard-button">Z</button>
        <button className="keyboard-button">X</button>
        <button className="keyboard-button">C</button>
        <button className="keyboard-button">V</button>
        <button className="keyboard-button">B</button>
        <button className="keyboard-button">N</button>
        <button className="keyboard-button">M</button>
        <button className="keyboard-button">Enter</button>
      </div>
    </div>
  );
};

export default Keyboard;
