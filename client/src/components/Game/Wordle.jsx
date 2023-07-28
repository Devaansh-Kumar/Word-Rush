import React, { useEffect, useState } from "react";
import WordleGame from "./WordleGame";
import Spinner from "../Shared/Spinner";
import io from "socket.io-client";

const Wordle = () => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = io.connect("http://localhost:3000");

  useEffect(() => {
    socket.on('word', (word) => {
      setSolution(word);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {solution && <div> the solution is: {solution}</div>}
          {solution && <WordleGame solution={solution} />}
        </>
      )}
    </>
  );
};

export default Wordle;