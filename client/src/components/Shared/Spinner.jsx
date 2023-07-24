import { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

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
      <h2 style={{ fontSize: "24px", marginTop: "20px", textAlign: "center", fontWeight: "bold" }}>Hang tight...</h2>
    </div>
  );
}

export default Spinner;