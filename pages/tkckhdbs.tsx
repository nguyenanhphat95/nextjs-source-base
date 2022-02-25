import React from "react";
import CameraPage from "./Camara/CameraPage";
import { Grid } from "@mui/material";
const tkckhdbs = () => {
  return (
    <Grid container direction="column">
      <Grid item>Test camera</Grid>
      <Grid item>
        <CameraPage />
      </Grid>
    </Grid>
  );
};

export default tkckhdbs;
