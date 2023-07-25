import React from "react";
import PropTypes from "prop-types";
import letters from "./KeyboardLetters.json";

const Keyboard = ({ usedKeys }) => {
  console.log(letters);
  const firstRow = letters.letters[0].firstRow;
  const secondRow = letters.letters[1].secondRow;
  const thirdRow = letters.letters[2].thirdRow;
  const style =
    "h-12 w-12 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500";
  const SpecialKeyStyle =
    "h-12 w-20 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500";
  const BackSpaceStyle =
    "h-12 w-32 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500";

  return (
    <div className="flex flex-col mt-3 items-center">
      <div className="resize flex flex-row inline-block">
        {firstRow.map((l, i) => {
          const color = usedKeys[l.key];
          return (
            <div
              key={i}
              className={style}
              id={color}
              style={{ borderColor: color }}
            >
              {l.key}
            </div>
          );
        })}
        <div className={BackSpaceStyle}>
          Backspace
        </div>
      </div>
      <div className="resize flex flex-row inline-block">
        {secondRow.map((l, i) => {
          const color = usedKeys[l.key];
          return (
            <div
              key={i}
              className={style}
              id={color}
              style={{ borderColor: color }}
            >
              {l.key}
            </div>
          );
        })}
      </div>

      <div className="resize flex flex-row inline-block">
        <div className={SpecialKeyStyle}>
          Delete
        </div>
        {thirdRow.map((l, i) => {
          const color = usedKeys[l.key];
          return (
            <div
              key={i}
              className={style}
              id={color}
              style={{ borderColor: color }}
            >
              {l.key}
            </div>
          );
        })}
        <div className={SpecialKeyStyle}>
          Enter
        </div>
      </div>
    </div>
  );
};

Keyboard.propTypes = {
  usedKeys: PropTypes.object.isRequired,
};

export default Keyboard;
