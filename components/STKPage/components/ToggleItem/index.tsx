import React, { useState } from "react";
import Image from "next/image";

import { Grid, Typography } from "@mui/material";
import downPic from "public/images/down.png";

interface Props {
  resources: Record<string, string>;
  col: {
    title: string;
    options: string[];
  };
  isMobile: boolean;
}
const ToggleItem = (props: Props) => {
  const { resources, col, isMobile } = props;
  const [show, setShow] = useState(false);

  const _toggleMenu = () => {
    if (!isMobile) {
      return;
    }
    setShow((prev) => !prev);
  };

  const renderOption = (options: string[]) => {
    return (options || []).map((option, i) => (
      <Grid key={i} item>
        {resources[option]}
      </Grid>
    ));
  };
  return (
    <Grid item xs={12} md={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid
            onClick={_toggleMenu}
            alignItems="center"
            container
            justifyContent="space-between"
          >
            <Grid item xs="auto">
              <Typography>
                <b>{resources[col.title]}</b>
              </Typography>
            </Grid>
            {isMobile && (
              <Grid item xs="auto">
                <Image src={downPic} alt="down-pic" />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isMobile ? (
          <>{show && renderOption(col.options)}</>
        ) : (
          renderOption(col.options)
        )}
      </Grid>
    </Grid>
  );
};

export default ToggleItem;
