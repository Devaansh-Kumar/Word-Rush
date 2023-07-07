import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from './components/Spinner';
import Wordle from "./components/Game/Wordle";
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Spinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*<Route path="/game" element={<PrivateRoute Component={Wordle} />} /> */}
        <Route path="/game" element={<Wordle />} />
      </Routes>
    </>
  );
};

export default App;
