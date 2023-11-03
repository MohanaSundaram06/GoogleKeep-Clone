import React from "react";
import { useNavigate } from "react-router-dom";

function PlusButton() {
  const navigate = useNavigate();
  return (
    <button
      className="plus-button"
      onClick={() => {
        navigate("/add-note");
      }}
    >
      +
    </button>
  );
}

export default PlusButton;
