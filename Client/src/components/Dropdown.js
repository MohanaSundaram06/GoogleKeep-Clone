import React from "react";
import { useNavigate } from "react-router-dom";

function Dropdown(props) {
  const naviagte = useNavigate();

  return (
    <span
      onClick={() => {
        props.onShow();
        naviagte(`/label/${props.label.id}/${props.label.name}`);
        window.location.reload();
      }}
    >
      {props.label.name}
    </span>
  );
}

export default Dropdown;
