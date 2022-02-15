import React from "react";
import styles from "./styles.module.css";

const LoadingPage = () => {
  return (
    <div className={styles["loading-page-container"]}>
      <div className={styles["lds-dual-ring"]}></div>
    </div>
  );
};
export default LoadingPage;
