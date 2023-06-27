import { useEffect } from "react";
import Keyboard from "./components/Keyboard";
import "./App.css";
import WordleGame from "./components/WordleGame";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <div className="flex justify-center text-sm mb-1 font-serif">
        <h1>WORD-RUSH</h1>
      </div>

      <div>
        {/* <GridComponent /> */}
        {/* <WordleGame /> */}
        {/* <Keyboard handleKeyPress={handleKeyPress}/> */}
        <Login />
        <Register />
      </div>
    </>
  );
}

export default App;