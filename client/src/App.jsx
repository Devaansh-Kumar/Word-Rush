import { useEffect } from "react";
import { Letter_Box } from "./components/Letterbox";
import GridComponent from "./components/Grid";
import Keyboard from "./components/Keyboard";
import "./App.css";
import WordleGame from "./components/WordleGame";

function App() {

  return (
    <>
      <div className="flex justify-center text-sm mb-1 font-serif">
        <h1>WORD-RUSH</h1>
      </div>

      <div>
        {/* <GridComponent /> */}
        <WordleGame />
        <Keyboard />
      </div>
    </>
  );
}

export default App;