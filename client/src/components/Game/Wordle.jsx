import React, { useEffect, useState } from "react";
import axios from "axios";
import WordleGame from "./WordleGame";

const Wordle = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://random-word-api.vercel.app/api?length=5"
        );
        const wordString = response.data.join("");
        setSolution(wordString.toUpperCase());
        console.log(solution);
      } catch (error) {
        console.log(error);
        console.error("Maximum retry limit reached. Unable to fetch data.");
      }
    };
    fetchData();
  }, [setSolution]);

  return (
    <>
      <div className="flex justify-center text-sm mt-1 mb-2 font-serif">
        <h1>WORD-RUSH</h1>
      </div>

      {<WordleGame solution={solution} />}
    </>
  );
};

export default Wordle;
