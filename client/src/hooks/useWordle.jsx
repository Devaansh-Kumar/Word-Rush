import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const checkWord = async (word) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (response.status === 200) {
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error("Error fetching the data");
    return false; 
  }
};

const useWordle = (solution, toastError, toastSuccess) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((key) => {
      return { key: key, color: "gray" };
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
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

  const addNewGuess = async (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

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

    setCurrentGuess("");
  };

  const handleKeyPress = async (e) => {
    const key = e.key.toUpperCase();

    if (key === "BACKSPACE") {
      setCurrentGuess((prevGuess) => {
        return prevGuess.slice(0, -1);
      });
    } else if (key === "DELETE") {
      setCurrentGuess("");
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prevGuess) => {
          return prevGuess + key;
        });
      }
    } else if (key === "ENTER") {
      if (turn > 5) {
        console.log("You used up all guesses");
        return;
      } else if (currentGuess.length !== 5) {
        console.log("Guess must be 5 characters long");
        toastError("Guess must be 5 characters long", 3000);
      } else {
        const isValidWord = await checkWord(currentGuess);
        if (isValidWord) {
          const formattedGuess = formatGuess();
          console.log(formattedGuess);
          addNewGuess(formattedGuess);
        } else {
          console.log("Enter a valid English word");
          toast.error("Please enter a valid English word", { autoClose: 1200 });
        }
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyPress,
  };
};

export default useWordle;
