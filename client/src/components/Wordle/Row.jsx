import React from "react";

const Row = ({ guess, currentGuess }) => {
  const style =
    "block h-16 w-16 m-1 border-2 border-neutral-600 py-4 text-2xl font-bold uppercase";

  if (guess) {
    return (
      <div className="flex text-center justify-center">
        {guess.map((letter, index) => (
          <div key={index} className={style} id={letter.color}>{letter.key}</div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split('');

    return (
        <div className="flex text-center justify-center">
            {letters.map((letter, index) => (
                <div key={index} className={style}>{letter}</div>
            ))}
            {[...Array(5 - letters.length)].map((letter, index) => (
                <div key={index} className={style}></div>
            ))}
        </div>
    );

  }

  return (
    <div className="flex text-center justify-center">
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
      <div className={style}></div>
    </div>
  );
};

export default Row;
