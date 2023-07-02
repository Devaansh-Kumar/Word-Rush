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
      {solution && <div> the solution is: {solution}</div>}
      {solution && <WordleGame solution={solution}/>}      
    </>
  );
};

export default Wordle;
