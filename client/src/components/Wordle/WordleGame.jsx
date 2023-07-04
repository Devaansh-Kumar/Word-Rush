import React, { useEffect } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WordleGame = ({ solution }) => {
  const toastSuccess = (message, time) => {
    toast.success(message, {autoClose: time});
  }
  const toastError = (message, time) => {
    toast.error(message, {autoClose: time});
  }
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyPress } =
    useWordle(solution, toastError);



  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    if (isCorrect) {
      console.log("you have won");
      toastSuccess("Congratulations! You guessed the word correctly!", 3000);
      window.removeEventListener("keyup", handleKeyPress);
    }

    if (turn > 5) {
      console.log("you lose, out of guessses");
      toastError("Game over! You ran out of attempts.", 5000);
      window.removeEventListener("keyup", handleKeyPress);
    }

    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress, isCorrect, turn]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>WordleGame - {currentGuess}</div>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keyboard usedKeys={usedKeys} />
      <ToastContainer />
    </>
  );
};

export default WordleGame;
