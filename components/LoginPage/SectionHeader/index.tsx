import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Popover, Box } from "@mui/material";

import hdBankLogoPic from "public/images/HDBanklogo.png";
import languageViPic from "public/images/language-vi.png";
import languageEnPic from "public/images/en.png";
import downPic from "public/images/down.png";
import { LANGUAGE } from "commons/constants";

createTheme();
const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: "12px 48px 12px 48px",
    [theme.breakpoints?.down("sm")]: {
      padding: "5px 10px",
    },
  },
  languageIcon: {
    marginRight: "10px",
  },
  languageContainer: {
    padding: 10,
    minWidth: 145,
  },
  pointer: {
    cursor: "pointer",
  },
  wrapperIcon: {
    display: "flex",
  },
}));

const SectionHeader = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { locale, asPath } = useRouter();

  const _openLanguage = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const _closeLanguage = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs="auto">
          <Grid alignItems="center" container spacing={2}>
            <Grid item xs="auto">
              <Image src={hdBankLogoPic} alt="hdBank-logo" height={72} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <Grid
            onClick={_openLanguage}
            spacing={1}
            alignItems="center"
            container
            className={classes.pointer}
          >
            <Grid item xs="auto" className={classes.languageIcon}>
              <Image
                width={35}
                height={35}
                src={locale === LANGUAGE.VI ? languageViPic : languageEnPic}
                alt="star-icon"
              />
            </Grid>
            <Grid item xs="auto">
              <Image src={downPic} alt="down-pic" />
            </Grid>
          </Grid>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={_closeLanguage}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className={classes.languageContainer}>
              <Box mb={2}>
                <Link href={asPath} locale={LANGUAGE.VI}>
                  <Grid
                    onClick={_closeLanguage}
                    alignItems="center"
                    container
                    className={classes.pointer}
                  >
                    <Grid item xs={4} className={classes.wrapperIcon}>
                      <Image
                        width={30}
                        height={30}
                        src={languageViPic}
                        alt="star-icon"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <b>Tiếng Việt</b>
                    </Grid>
                  </Grid>
                </Link>
              </Box>
              <Box>
                <Link href={asPath} locale={LANGUAGE.EN}>
                  <Grid
                    onClick={_closeLanguage}
                    alignItems="center"
                    container
                    className={classes.pointer}
                  >
                    <Grid item xs={4} className={classes.wrapperIcon}>
                      <Image
                        width={30}
                        height={30}
                        src={languageEnPic}
                        alt="star-icon"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <b>English</b>
                    </Grid>
                  </Grid>
                </Link>
              </Box>
            </div>
          </Popover>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionHeader;
