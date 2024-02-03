import React from 'react';
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 right-0 mt-5 mr-7 border-zinc-500">
      <button
        onClick={handleLogout}
        className="bg-black-500 text-white font-bold py-2 px-4 rounded border-zinc-500 hover:border-zinc-500"
      >
        Logout
      </button>
    </div>

  );
}

export default Logout;
