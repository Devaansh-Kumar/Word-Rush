import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Keyboard from "./KeyboardKey";

const WordleGame = () => {
  const [word, setWord] = useState(""); // The five-letter word
  const [grid, setGrid] = useState(Array(6).fill(Array(5).fill(""))); // 6x5 grid for user input
  const [currentRow, setCurrentRow] = useState(0); // Current row being filled
  const inputRefs = useRef(
    Array(6)
      .fill()
      .map(() => Array(5).fill(null))
  ); // Refs for each input cell
  const [keyboard, setKeyboard] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const checkWord = async (word) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (response.status === 200) {
        return true; // Valid word
      } else {
        return false; // Invalid word
      }
    } catch (error) {
      console.error("Oops, try again in sometime.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.vercel.app/api?length=5"
      );
      const wordString = response.data.join("");
      setWord(wordString);
      console.log(wordString);
    } catch (error) {
      console.error("Maximum retry limit reached. Unable to fetch data.");
    }
  };

  useEffect(() => {
    // Focus on the first input cell of the current row when it changes
    inputRefs.current[currentRow][0].focus();
  }, [currentRow]);

  const handleInputChange = (e, rowIndex, columnIndex) => {
    const inputValue = e.target.value.toUpperCase(); // Convert the input to uppercase

    // Only allow alphabetic characters
    if (/^[A-Z]$/.test(inputValue) || inputValue === "") {
      const updatedGrid = [...grid];
      updatedGrid[rowIndex] = [...updatedGrid[rowIndex]];
      updatedGrid[rowIndex][columnIndex] = inputValue;
      setGrid(updatedGrid);

      if (columnIndex < 4) {
        // Automatically move to the next grid cell (except for the last cell of a row)
        inputRefs.current[rowIndex][columnIndex + 1].focus();
      } else if (rowIndex < 5) {
        // Move to the first cell of the next row
        inputRefs.current[rowIndex + 1][0].focus();
      }
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

  const validateGuess = async () => {
    const guess = grid[currentRow].join("");

    if (guess.length !== 5) {
      toast.error("Please enter a valid 5-letter word.", { autoClose: 2000 });
      return;
    }

    // Check if the guess is a valid word
    const isValid = await checkWord(guess);
    if (!isValid) {
      toast.error("Please enter a valid English word.", { autoClose: 2000 });

      // Erase the words in the current row
      const updatedGrid = [...grid];
      updatedGrid[currentRow] = Array(5).fill("");
      setGrid(updatedGrid);

      // Move focus to the first box in the current row
      inputRefs.current[currentRow][0].focus();
      return;
    }

    if (guess.toLowerCase() === word) {
      toast.success("Congratulations! You guessed the word correctly!", {
        autoClose: 3000,
      });
      resetGame();
    } else {
      if (currentRow === 5) {
        toast.error("Game over! You ran out of attempts.", { autoClose: 5000 });
        resetGame();
      } else {
        setCurrentRow((prevRow) => prevRow + 1);
      }
    }
  };

  const handleKeyClick = (key) => {
    const currentInput = inputRefs.current[currentRow];
    const currentIndex = currentInput.findIndex(
      (ref) => ref === document.activeElement
    );
    if (currentIndex !== -1) {
      const updatedGrid = [...grid];
      updatedGrid[currentRow][currentIndex] = key.toUpperCase();
      setGrid(updatedGrid);
      if (currentIndex < 4) {
        currentInput[currentIndex + 1].focus();
      } else if (currentRow < 5) {
        inputRefs.current[currentRow + 1][0].focus();
      }
    }
  };

  const resetGame = () => {
    setGrid(Array(6).fill(Array(5).fill("")));
    setCurrentRow(0);
    setWord(fetchData()); // obtain the word for the new game
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        <table className="table-auto">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      className="h-14 w-14 m-1 border-2 border-neutral-600 text-center text-2xl font-semibold"
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
      <Keyboard handleKeyClick={handleKeyClick} />
      <ToastContainer />
    </>
  );
};

export default WordleGame;
