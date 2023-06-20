import React, { useState, useRef, useEffect } from "react";
import Keyboard from "./Keyboard";

const WordleGame = () => {
  const [word, setWord] = useState("APPLE"); // The five-letter word
  const [grid, setGrid] = useState(Array(6).fill(Array(5).fill(""))); // 6x5 grid for user input
  const [currentRow, setCurrentRow] = useState(0); // Current row being filled

  const inputRefs = useRef(
    Array(6)
      .fill()
      .map(() => Array(5).fill(null))
  ); // Refs for each input cell

  useEffect(() => {
    // Focus on the first input cell of the current row when it changes
    inputRefs.current[currentRow][0].focus();
  }, [currentRow]);

  const handleInputChange = (e, rowIndex, columnIndex) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex] = [...updatedGrid[rowIndex]];
    updatedGrid[rowIndex][columnIndex] = e.target.value.toUpperCase(); // Convert the guess to uppercase
    setGrid(updatedGrid);

    if (columnIndex < 4) {
      // Automatically move to the next grid cell (except for the last cell of a row)
      inputRefs.current[rowIndex][columnIndex + 1].focus();
    } else if (rowIndex < 5) {
      // Move to the first cell of the next row
      inputRefs.current[rowIndex + 1][0].focus();
    }
  };

  const handleKeyPress = (e, rowIndex, columnIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (rowIndex === currentRow && columnIndex === 4) {
        validateGuess();
      } else if (rowIndex === currentRow && columnIndex < 4) {
        inputRefs.current[rowIndex][columnIndex + 1].focus();
      } else if (rowIndex < currentRow) {
        inputRefs.current[rowIndex + 1][0].focus();
      }
    } else if (e.key === "Backspace") {
      if (grid[rowIndex][columnIndex] === "" && columnIndex > 0) {
        // If the current cell is empty, delete the letter of the previous cell and move the cursor back
        e.preventDefault();
        const updatedGrid = [...grid];
        updatedGrid[rowIndex][columnIndex - 1] = "";
        setGrid(updatedGrid);
        inputRefs.current[rowIndex][columnIndex - 1].focus();
      } else if (
        grid[rowIndex][columnIndex] !== "" &&
        columnIndex === 0 &&
        rowIndex > 0
      ) {
        // If the current cell is the first cell of a filled row, clear the row and move the cursor to the first cell of the previous row
        e.preventDefault();
        const updatedGrid = [...grid];
        updatedGrid[rowIndex] = Array(5).fill("");
        setGrid(updatedGrid);
        inputRefs.current[rowIndex - 1][0].focus();
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      const updatedGrid = [...grid];
      for (let i = 0; i < 5; i++) {
        updatedGrid[rowIndex][i] = "";
      }
      setGrid(updatedGrid);
      inputRefs.current[rowIndex][0].focus();
    }
  };

  const validateGuess = () => {
    const guess = grid[currentRow].join("");
    if (guess.length !== 5) {
      alert("Please enter a valid 5-letter word.");
      return;
    }
    // Check if the guess is a valid word
    if (!isValidWord(guess)) {
      alert("Please enter a valid word.");
      return;
    }
    if (guess === word) {
      alert("Congratulations! You guessed the word correctly!");
      resetGame();
    } else {
      if (currentRow === 5) {
        alert("Game over! You ran out of attempts.");
        resetGame();
      } else {
        setCurrentRow((prevRow) => prevRow + 1);
      }
    }
  };

  const resetGame = () => {
    setGrid(Array(6).fill(Array(5).fill("")));
    setCurrentRow(0);
    setWord(generateNewWord());
  };

  const generateNewWord = () => {
    // Generate a new random 5-letter word
    // You can replace this logic with your own word generation logic
    const words = ["APPLE", "ORANGE", "LEMON", "GRAPE", "MANGO"];
    return words[Math.floor(Math.random() * words.length)];
  };

  const isValidWord = (word) => {
    // Check if the word is a valid word
    // You can replace this logic with your own word validation logic
    const validWords = ["APPLE", "ORANGE", "LEMON", "GRAPE", "MANGO"];
    return validWords.includes(word);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        <p>Attempts Remaining: {6 - currentRow}</p>
        <table className="table-auto">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      className="h-16 w-16 m-1 text-center"
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, columnIndex)
                      }
                      onKeyDown={(e) =>
                        handleKeyPress(e, rowIndex, columnIndex)
                      }
                      ref={(ref) => {
                        inputRefs.current[rowIndex][columnIndex] = ref;
                      }}
                      maxLength={1}
                      disabled={rowIndex !== currentRow}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Keyboard/>
    </>
  );
};

export default WordleGame;
