import { Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<WordleGame />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
