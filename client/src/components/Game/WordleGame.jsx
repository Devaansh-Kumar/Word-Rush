import React, { useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "../Board/Grid";
import Keyboard from "../Keyboard/Keyboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meaning from "../Popup/Popup";
import Logout from "../Button/Logout";

const WordleGame = ({ solution }) => {
  const toastSuccess = (message, time) => {
    toast.success(message, { autoClose: time });
  };
  const toastError = (message, time) => {
    toast.error(message, { autoClose: time });
  };
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyPress } =
    useWordle(solution, toastError, toastSuccess);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    if (isCorrect && !showPopup) {
      toastSuccess("Congratulations! You guessed the word correctly!", 3000);
      setTimeout(() => {
        setShowPopup(true);
      }, 500);
      window.removeEventListener("keyup", handleKeyPress);
    }

    if (turn > 5 && !showPopup) {
      toastError("Game over! You ran out of attempts.", 5000);
      toast.info(`The answer was ${solution}`, { autoClose: 7000 });
      setTimeout(() => {
        setShowPopup(true);
      }, 500);
      window.removeEventListener("keyup", handleKeyPress);
    }

    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress, isCorrect, turn]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <Logout />
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keyboard usedKeys={usedKeys} />
      <ToastContainer />
      {showPopup && <Meaning solution={solution} />}
    </>
  );
};

export default WordleGame;
