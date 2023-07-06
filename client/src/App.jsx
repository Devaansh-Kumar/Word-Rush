import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from './components/Spinner';
import Wordle from "./components/Game/Wordle";

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
