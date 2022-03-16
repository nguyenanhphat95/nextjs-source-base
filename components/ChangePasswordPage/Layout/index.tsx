import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Box, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#e9e9e9",
    minHeight: 300,
  },
  img: {
    width: "100%",
    zIndex: -1,
  },
  contentLayout: {
    display: "flex",
    justifyContent: "center",
    marginTop: -5,
  },
  content: {
    padding: 30,
    width: "100%",
    maxWidth: 1000,
    minHeight: 400,
    borderRadius: 20,
    background: "white",
    zIndex: 1,
    position: "relative",
    margin: 30,
    marginTop: -115,
    [theme.breakpoints.down("sm")]: {
      padding: '30px 22px',
      margin: '30px 22px',
      marginTop: -115,
    },
  },
}));

const Layout = (props: any) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Grid>
        <img
          src={isMobile ? "/sso-changePassword/images/mobile.jpg" : "/sso-changePassword/images/desktop.jpg"}
          alt="Picture of the author"
          className={classes.img}
        />
      </Grid>
      <Grid className={classes.root}>
        <Box className={classes.contentLayout}>
          <Box className={classes.content}>{props.children}</Box>
        </Box>
      </Grid>
    </div>
  );
};

export default Layout;
