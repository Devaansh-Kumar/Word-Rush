import React from "react";
import PropTypes from "prop-types";
import Row from "./Row";

const Grid = ({ currentGuess, turn, guesses }) => {

  return (
    <div>
        {guesses.map((guess, index) => {
            if(turn === index) {
                return <Row key={index} currentGuess={currentGuess} />
            }

            return <Row key={index} guess={guess} />
        })}
    </div>
  );
};

Grid.propTypes = {
  currentGuess: PropTypes.string,
  turn: PropTypes.number,
  guesses: PropTypes.arrayOf(PropTypes.string),
};

export default Grid;
