import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import hdBankLogoPic from "public/images/HDBanklogo.png";
import addressIcon from "public/images/address.png";
import phoneIcon from "public/images/Phone.png";
import mailIcon from "public/images/Mail.png";
import qrIcon from "public/images/qr.png";
import googlePlayIcon from "public/images/GooglePlay.png";
import appStoreIcon from "public/images/AppStore.png";
import fbIcon from "public/images/fb.png";
import instagramIcon from "public/images/instagram.png";
import zaloIcon from "public/images/zalo.png";
import ellipseIcon from "public/images/Ellipse.png";
import whatsappIcon from "public/images/whatsapp.png";
import twitterIcon from "public/images/twitter.png";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";

import ToggleItem from "../ToggleItem";

import _get from "lodash/get";
import _slice from "lodash/slice";

createTheme();
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: "#F4F4F4",
  },
  root: {
    margin: "0px 48px",
    [theme.breakpoints?.down("sm")]: {
      margin: "48px 24px",
    },
  },
  borderRight: {
    borderRight: "1px solid #333333",
  },
}));

const INFO = [
  {
    icon: addressIcon,
    name: `25Bis Nguyễn Thị Minh Khai, P. Bến Nghé,
    Quận 1, TP. Hồ Chí Minh`,
  },
  {
    icon: phoneIcon,
    name: "19006060",
  },
  {
    icon: mailIcon,
    name: "info@hdbank.com.vn",
  },
  {
    icon: null,
    name: "Fax: (028) 62 915 900",
  },
  {
    icon: null,
    name: "SWIFT code: HDBCVNVX",
  },
];

const COLUMNS = [
  {
    title: "col1title1",
    options: [
      "col1content1",
      "col1content2",
      "col1content3",
      "col1content4",
      "col1content5",
    ],
  },
  {
    title: "col2title2",
    options: [
      "col2content1",
      "col2content2",
      "col2content3",
      "col2content4",
      "col2content5",
    ],
  },
  {
    title: "col3title3",
    options: [
      "col3content1",
      "col3content2",
      "col3content3",
      "col3content4",
      "col3content5",
    ],
  },
  {
    title: "col4title4",
    options: [
      "col4content1",
      "col4content2",
      "col4content3",
      "col4content4",
      "col4content5",
    ],
  },
];

const LIST_OTHER_INFO = ["copyright", "termOfUse", "safeAndSecure", "siteMap"];

const LIST_ICON_APP = [
  {
    icon: fbIcon,
  },
  {
    icon: instagramIcon,
  },
  {
    icon: zaloIcon,
  },
  {
    icon: ellipseIcon,
  },
  {
    icon: whatsappIcon,
  },
  {
    icon: twitterIcon,
  },
];

const SectionFooter = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "footer"]);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Box py={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Box mb={3}>
                <Image src={hdBankLogoPic} alt="hdBank-logo" height={72} />
              </Box>
              {INFO.map((info, index) => (
                <Box key={index}>
                  <Grid container alignItems="center" spacing={1}>
                    {info.icon && (
                      <Grid item xs="auto">
                        <Image width={20} src={info.icon} alt="icon" />
                      </Grid>
                    )}
                    <Grid item xs={true}>
                      {info.name}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                {COLUMNS.map((col, index) => (
                  <ToggleItem
                    isMobile={isMobile}
                    col={col}
                    resources={t}
                    key={index}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Box my={2}>
          <Grid justifyContent="center" alignItems="center" container>
            {_slice(
              LIST_OTHER_INFO,
              isMobile ? 1 : 0,
              LIST_OTHER_INFO.length
            ).map((item, index) => (
              <Grid key={index} item xs="auto">
                <Box
                  px={isMobile ? 1 : 2}
                  className={
                    index !== LIST_OTHER_INFO.length - (isMobile ? 2 : 1)
                      ? classes.borderRight
                      : ""
                  }
                >
                  {t[item]}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        <Box py={4}>
          <Grid spacing={2} container justifyContent="space-between">
            <Grid item xs={12} md="auto">
              {!isMobile && (
                <Box>
                  <b>{t.downloadHDBankApp}</b>
                </Box>
              )}
              <Grid container spacing={1}>
                {!isMobile && (
                  <Grid item xs={12} md="auto">
                    <Image src={qrIcon} alt="qr-code" />
                  </Grid>
                )}
                <Grid item xs={12} md="auto">
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={12}>
                      <Image src={googlePlayIcon} alt="google-play" />
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <Image src={appStoreIcon} alt="app-store" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md="auto">
              <Box
                mb={1}
                display="flex"
                justifyContent={isMobile ? "center" : "flex-end"}
              >
                <b>{t.connectHDBank}</b>
              </Box>
              <Grid
                spacing={1}
                container
                justifyContent={isMobile ? "center" : "flex-end"}
              >
                {LIST_ICON_APP.map((item, index) => (
                  <Grid key={index} item xs="auto">
                    <Image src={item.icon} alt="icon-share" />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default SectionFooter;
