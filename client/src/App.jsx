import { useEffect } from "react";
import { Letter_Box } from "./components/Letterbox";
import GridComponent from "./components/Grid";
import Keyboard from "./components/Keyboard";
import "./App.css";
import WordleGame from "./components/WordleGame";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    Letter_Box();
  }, []);

  return (
    <>
      <div className="flex justify-center text-sm mb-1 font-serif">
        <h1>WORD-RUSH</h1>
      </div>

      <div>
        {/* <GridComponent /> */}
        <WordleGame />
      </div>
    </>
  );
}

export default App;
