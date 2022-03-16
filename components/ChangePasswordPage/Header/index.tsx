import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic"

// const myLoader = dynamic(() => import("../../commons/helpers"), { ssr: false })

import { makeStyles } from "@mui/styles";
import { createTheme, useTheme } from "@mui/material/styles";
import { Grid, Popover, Box, Theme } from "@mui/material";

import hdBankLogoPic from "public/images/HDBanklogo.png";
import languageViPic from "public/images/language-vi.png";
import languageEnPic from "public/images/en.png";
import downPic from "public/images/down.png";
import { LANGUAGE } from "commons/constants";
// import { myLoader } from "commons/helpers";


createTheme();

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: "5px 48px 5px 48px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 10px",
    },
  },
}));

const SectionHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs="auto">
          <Grid alignItems="center" container spacing={2}>
            <Grid item xs="auto">
              <Image
                src={hdBankLogoPic}
                alt="hdBank-logo"
                height={50}
                width={120}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionHeader;
