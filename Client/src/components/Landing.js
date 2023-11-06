import React, { Fragment } from "react";
import Notes from "./Notes";
import "../Style/noteForm.css";

import PlusButton from "./PlusButton";

function Landing() {
  return (
    <Fragment>
      <Notes />
      <PlusButton />
    </Fragment>
  );
}

export default Landing;
