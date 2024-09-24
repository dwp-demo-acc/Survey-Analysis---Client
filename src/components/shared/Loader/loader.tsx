import React from "react";
import style from "./loader.module.css";
const Loader = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loadingText}>Loading...</div>
      <div className={style.loadingSpinner}></div>
    </div>
  );
};

export default Loader;
