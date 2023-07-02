import { Route, Routes } from 'react-router-dom';
import "./App.css";
import WordleGame from "./components/WordleGame";
import Login from "./components/Login";
import Register from "./components/Register";
import Spinner from './components/Spinner';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Spinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<WordleGame />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
