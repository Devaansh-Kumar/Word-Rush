import React from "react";
import letters from "./KeyboardLetters.json";

const Keyboard = ({ usedKeys }) => {
  console.log(letters);
  const firstRow = letters.letters[0].firstRow;
  const secondRow = letters.letters[1].secondRow;
  const thirdRow = letters.letters[2].thirdRow;
  const style =
    "h-11 w-11 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500 text-white";
  const SpecialKeyStyle =
    "h-11 w-20 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500 text-white";
  const BackSpaceStyle =
    "h-11 w-32 m-0.5 border-2 py-2 border-neutral-700 rounded-md text-xl text-center font-semibold bg-zinc-800 hover:border-zinc-500 text-white";

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

export default Keyboard;
