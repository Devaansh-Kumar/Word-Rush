import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 right-0 mt-7 mr-7">
      <button
        onClick={handleLogout}
        className="bg-black-500 border-zinc-300 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>

  );
}

export default Logout;
