import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useWordle = (solution, toastError, toastSuccess) => {
  const [turn, setTurn] = useState(0); // what turn user is on
  const [currentGuess, setCurrentGuess] = useState(""); // what user is currently typing
  const [guesses, setGuesses] = useState([...Array(6)]); // place all guesses in this array
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // Checks the validity of the guess and adds color to it
  // after running this function the formatted guess will look like
  // [{key : 'd', color : 'green'}, {key : 'k', color : 'yellow'} ...]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((key) => {
      return { key: key, color: "gray" };
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] == letter.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[index] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state and increment the turn
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // adding guess to guesses array
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    // incrementing turn
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "gray" &&
          currentColor !== "yellow" &&
          currentColor !== "green"
        ) {
          newKeys[letter.key] = "gray";
          return;
        }
      });
      return newKeys;
    });

    // resetting the guess to empty string
    setCurrentGuess("");
  };

  const handleKeyPress = (e) => {
    // console.log("this is k", k);
    const key = e.key.toUpperCase();
    console.log(key);

    if (key === "BACKSPACE") {
      setCurrentGuess((prevGuess) => {
        return prevGuess.slice(0, -1);
      });
    } else if (key === "DELETE") {
      setCurrentGuess((prevGuess) => {
        return "";
      });
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prevGuess) => {
          return prevGuess + key;
        });
      }
    } else if (key === "ENTER") {
      // you can only enter if guess is turn is less than 5 and length of guess is 5
      if (turn > 5) {
        console.log("you used up all guesses");
        return;
      } else if (currentGuess.length !== 5) {
        console.log("Guess must be 5 characters long");
        toastError("Guess must be 5 characters long", 3000);
      } else {
        const formattedGuess = formatGuess();
        console.log(formattedGuess);
        addNewGuess(formattedGuess);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyPress };
};

export default useWordle;
