import React, { Fragment, useEffect } from "react";
import Notes from "./Notes";
import "../Style/noteForm.css";
import Navbar from "./Navbar";
import PlusButton from "./PlusButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import RegisterForm from "./RegisterForm";

function Landing() {
  return (
    <Fragment>
      <Notes />
      <PlusButton />
    </Fragment>
  );
}

export default Landing;
