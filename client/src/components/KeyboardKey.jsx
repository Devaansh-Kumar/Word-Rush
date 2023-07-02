import React from "react";

const Keyboard = ({ handleKeyClick }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleKeyPress = (key) => {
    handleKeyClick(key);
  };

  return (
    <div className="keyboard">
      {alphabet.map((key) => (
        <button
          key={key}
          className="keyboard-key"
          onClick={() => handleKeyPress(key)}
        >
          {key}
        </button>
      ))}
      <button
        className="keyboard-key backspace"
        onClick={() => handleKeyPress("Backspace")}
      >
        Backspace
      </button>
      <button
        className="keyboard-key enter"
        onClick={() => handleKeyPress("Enter")}
      >
        Enter
      </button>
      <button
        className="keyboard-key delete"
        onClick={() => handleKeyPress("Delete")}
      >
        Delete
      </button>
    </div>
  );
};

export default Keyboard;
