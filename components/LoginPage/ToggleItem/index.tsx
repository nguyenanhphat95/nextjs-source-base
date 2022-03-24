import React, { useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography } from "@mui/material";
// import downPic from "public/images/down.png";

interface Props {
  resources: Record<string, string>;
  col: {
    title: string;
    options: { name: string; url: string }[];
  };
  isMobile: boolean;
}
const ToggleItem = (props: Props) => {
  const { resources, col, isMobile } = props;
  const [show, setShow] = useState(false);
  const router = useRouter();

  const _toggleMenu = () => {
    if (!isMobile) {
      return;
    }
    setShow((prev) => !prev);
  };

  const _redirect = (url: string) => {
    router.push(url);
  };

  const renderOption = (options: { name: string; url: string }[]) => {
    return (options || []).map((option, i) => (
      <Grid
        style={{ cursor: "pointer" }}
        onClick={() => _redirect(option.url)}
        key={i}
        item
      >
        {resources[option.name]}
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
                <img src={"/sso/images/down.png"} alt="down-pic" />
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
