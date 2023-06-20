import { useEffect } from "react";
import { Letter_Box } from "./components/Letterbox";
import GridComponent from "./components/Grid";
import Keyboard from "./components/Keyboard";
import "./App.css";
import WordleGame from "./components/WordleGame";

function App() {
  useEffect(() => {
    Letter_Box();
  }, []);

  return (
    <>
      <h1 className="app-name">WORD-RUSH</h1>
      <div>
        {/* <GridComponent /> */}
        {/* <Keyboard /> */}
        <WordleGame />
      </div>
    </>
  );
}

export default App;
