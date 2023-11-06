import React, { Fragment } from "react";
import "../Style/navBar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("userId");

  return (
    <Fragment>
      {userData && (
        <div className="d-flex bg-dark navbar ">
          <h2>Google Keep</h2>
          <div className="d-flex menu">
            <div
              onClick={() => {
                navigate("/home");
              }}
            >
              Notes
            </div>

            <div
              onClick={() => {
                navigate("/remainder");
              }}
            >
              Remainder
            </div>

            <div
              onClick={() => {
                navigate("/label");
              }}
            >
              Labels
            </div>

            <div
              onClick={() => {
                navigate("/archive");
              }}
            >
              Archived
            </div>

            <div
              onClick={() => {
                navigate("/trash");
              }}
            >
              Trash
            </div>
          </div>
          <div className="d-flex user">
            <div>{localStorage.getItem("username")}</div>
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Navbar;
