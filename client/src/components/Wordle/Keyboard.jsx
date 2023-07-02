import React from "react";
import letters from "./KeyboardLetters.json";

const Keyboard = () => {
  // const [letters, setLetters] = useState(null);
  console.log(letters);
  const firstRow = letters.letters[0].firstRow;
  const secondRow = letters.letters[1].secondRow;
  const thirdRow = letters.letters[2].thirdRow;
  const style =
    "h-12 w-12 m-0.5 border-2 py-2 border-neutral-600 rounded-md text-xl text-center bg-zinc-800";

  return (
    <div className="flex flex-col m-6 items-center">
      <div className="flex flex-row">
        {firstRow.map((l, i) => {
          return (
            <div key={i} className={style}>
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        {secondRow.map((l, i) => {
          return (
            <div key={i} className={style}>
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        {thirdRow.map((l, i) => {
          return (
            <div key={i} className={style}>
              {l.key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
