import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import LoginForm from "../LoginForm";
import UtilityEbank from "../UtilityEbank";
import _get from "lodash/get";

createTheme();
const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 500,
  },
  borderRight: {
    borderRight: "1px solid #BCC0CC",
  },
}));

interface Props {
  onSubmit: (
    JSEnscript: any,
    data: { username: string; password: string }
  ) => void;
}

const SectionLogin = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();

  const _handleSubmit = (data: { username: string; password: string }) => {
    const JSEnscript = _get(window, "JSEncrypt");
    onSubmit(JSEnscript, data);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className={classes.borderRight}>
          <UtilityEbank />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <LoginForm onSubmit={_handleSubmit} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionLogin;
