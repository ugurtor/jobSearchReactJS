import React from "react";

import jobsImage from "../../assets/jobs.jpg";
import classes from "./Header.module.css";
function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>Job Search - JBS</h1>
      </header>
      <div className={classes["main-image"]}>
        <img src={jobsImage} alt="Job Search whiteboard with desperate man" />
      </div>
    </>
  );
}

export default Header;
