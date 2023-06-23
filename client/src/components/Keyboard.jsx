import React from 'react';

const Keyboard = () => {
  const handleKeyPress = (key) => {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
  };

  const handleBackspace = () => {
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    document.dispatchEvent(event);
  };

  const handleDelete = () => {
    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    document.dispatchEvent(event);
  };

  const handleEnter = () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);
  };

  return (
    <div id="keyboard">
      <div className="first-row">
        <button className="keyboard-button" onClick={() => handleKeyPress('Q')}> Q </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('W')}> W </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('E')}> E </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('R')}> R </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('T')}> T </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('Y')}> Y </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('U')}> U </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('I')}> I </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('O')}> O </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('P')}> P </button>
        <button className="keyboard-button" onClick={() => handleBackspace()}> Backspace </button>
      </div>
      <div className="second-row">
        <button className="keyboard-button" onClick={() => handleKeyPress('A')}> A </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('S')}> S </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('D')}> D </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('F')}> F </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('G')}> G </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('H')}> H </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('J')}> J </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('K')}> K </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('L')}> L </button>
      </div>
      <div className="third-row">
        <button className="keyboard-button" onClick={() => handleDelete()}> Delete </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('Z')}> Z </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('X')}> X </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('C')}> C </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('V')}> V </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('B')}> B </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('N')}> N </button>
        <button className="keyboard-button" onClick={() => handleKeyPress('M')}> M </button>
        <button className="keyboard-button" onClick={() => handleEnter()}> Enter </button>
      </div>
    </div>
  );
};

export default Keyboard;