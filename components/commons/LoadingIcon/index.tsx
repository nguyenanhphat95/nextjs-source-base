import React from "react";
import { makeStyles } from "@mui/styles";
import styles from "./styles.module.css";

// const useStyles = makeStyles(() => ({
//   root: {
//     display: "inline-block",
//     width: "80px",
//     height: "80px",
//     "&:after": {
//       content: " ",
//       display: "block",
//       width: "64px",
//       height: "64px",
//       margin: "8px",
//       borderRadius: "50%",
//       border: "6px solid #fff",
//       borderColor: "#fff transparent #fff transparent",
//       animation: "lds-dual-ring 1.2s linear infinite",
//     },
//   },
//   "@keyframes lds-dual-ring": {
//     "0%": {
//       transform: "rotate(0deg)",
//     },
//     "100%": {
//       transform: "rotate(360deg)",
//     },
//   },
// }));

const LoadingIcon = () => {
  // const classes = useStyles();
  return <div className={styles["lds-dual-ring"]}></div>;
};
export default LoadingIcon;
