import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const Text = () => {
  const classes = useStyles();
  return <div className={classes.root}>Text component</div>;
};

export default Text;
