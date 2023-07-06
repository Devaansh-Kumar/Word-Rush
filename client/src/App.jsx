import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Spinner from './components/Spinner';
import Wordle from "./components/Wordle/Wordle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Spinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Wordle />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
