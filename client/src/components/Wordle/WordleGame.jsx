import React, { useEffect } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";

const WordleGame = ({ solution }) => {
  const { turn, currentGuess, guesses, isCorrect, handleKeyPress } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>WordleGame - {currentGuess}</div>
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keyboard />
    </>
  );
};

export default WordleGame;
