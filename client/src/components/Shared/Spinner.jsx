import React from "react";
import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {
  let [loading] = useState(true);
  let [color] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <PacmanLoader 
        color={color}
        loading={loading}
        cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h2 className="text-2xl mt-4 text-center text-white"><b>Hang tight...</b></h2>
    </div>
  );
}

export default Spinner;