import { useEffect } from "react";
import Keyboard from "./components/Keyboard";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Wordle from "./components/Wordle/Wordle";

function App() {
  return (
    <>
      <div className="flex justify-center text-sm mb-1 font-serif">
        <h1>WORD-RUSH</h1>
      </div>

      <div>

        <Wordle/>        
      </div>
    </>
  );
}

export default App;