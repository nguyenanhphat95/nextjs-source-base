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
import qrIcon from "public/images/QRcode.png";
import googlePlayIcon from "public/images/GooglePlay.png";
import appStoreIcon from "public/images/AppStore.png";
import fbIcon from "public/images/fb.png";
import titokIcon from "public/images/titok.png";
import youtubeIcon from "public/images/youtube.png";
import instagramIcon from "public/images/instagram.png";
import zaloIcon from "public/images/zalo.png";
// import ellipseIcon from "public/images/Ellipse.png";
// import whatsappIcon from "public/images/whatsapp.png";
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
  pointer: {
    cursor: "pointer",
  },
}));

const INFO = [
  {
    icon: addressIcon,
    name: `25Bis Nguyễn Thị Minh Khai, P. Bến Nghé,
    Quận 1, TP. Hồ Chí Minh`,
    url: "",
  },
  {
    icon: phoneIcon,
    name: "19006060",
    url: "tel:19006060",
  },
  {
    icon: mailIcon,
    name: "info@hdbank.com.vn",
    url: 'mailto:info@hdbank.com.vn"',
  },
  {
    icon: null,
    name: "Fax: (028) 62 915 900",
    url: "",
  },
  {
    icon: null,
    name: "SWIFT code: HDBCVNVX",
    url: "",
  },
];

const COLUMNS = [
  {
    title: "col1title1",
    options: [
      { name: "col1content1", url: "https://www.hdbank.com.vn/en/about" },
      {
        name: "col1content2",
        url: "https://career.hdbank.com.vn/?_gl=1*u818jd*_ga*MTE0OTk2NjY4NS4xNjM5NDQzODEz*_ga_L6TMDVXKWJ*MTY0NjI5NTgyNy40LjEuMTY0NjI5ODcwMy4w",
      },
      { name: "col1content3", url: "https://www.hdbank.com.vn/en/news" },
    ],
  },
  {
    title: "col2title2",
    options: [
      {
        name: "col2content1",
        url: "https://www.hdbank.com.vn/en/personal/product/ngan-hang-dien-tu",
      },
      {
        name: "col2content2",
        url: "https://www.hdbank.com.vn/en/personal/product/san-pham-vay",
      },
      {
        name: "col2content3",
        url: "https://www.hdbank.com.vn/en/personal/product/the",
      },
      {
        name: "col2content4",
        url: "https://www.hdbank.com.vn/en/personal/product/san-pham-tien-gui",
      },
      {
        name: "col2content5",
        url: "https://www.hdbank.com.vn/en/personal/product/san-pham-dich-vu",
      },
      {
        name: "col2content6",
        url: "https://www.hdbank.com.vn/en/personal/product/bao-hiem",
      },
      {
        name: "col2content7",
        url: "https://www.hdbank.com.vn/en/personal/product/ngoai-te",
      },
      { name: "col2content8", url: "Promotion" },
    ],
  },
  {
    title: "col3title3",
    options: [
      {
        name: "col3content1",
        url: "https://www.hdbank.com.vn/en/corporate/product/ngoai-te-phai-sinh",
      },
      {
        name: "col3content2",
        url: "https://www.hdbank.com.vn/en/corporate/product/tai-tro-thuong-mai",
      },
      {
        name: "col3content3",
        url: "https://www.hdbank.com.vn/en/corporate/product/tin-dung",
      },
      {
        name: "col3content4",
        url: "https://www.hdbank.com.vn/en/corporate/product/ngan-hang-dai-ly",
      },
      {
        name: "col3content5",
        url: "https://www.hdbank.com.vn/en/corporate/product/quan-ly-dong-tien",
      },
      {
        name: "col3content6",
        url: "https://www.hdbank.com.vn/en/corporate/promotion",
      },
    ],
  },
  {
    title: "col4title4",
    options: [
      { name: "col4content1", url: "https://www.hdbank.com.vn/en/atm-branch" },
      {
        name: "col4content2",
        url: "https://env.hdbank.com.vn/searchs.html?_gl=1*1gvszz3*_ga*MTE0OTk2NjY4NS4xNjM5NDQzODEz*_ga_L6TMDVXKWJ*MTY0NjI5NTgyNy40LjEuMTY0NjI5OTA2Ny4w",
      },
      {
        name: "col4content3",
        url: "https://www.hdbank.com.vn/en/personal/cong-cu",
      },
      {
        name: "col4content4",
        url: "https://www.hdbank.com.vn/en/personal/QnA",
      },
      { name: "col4content5", url: "https://www.hdbank.com.vn/en/contact" },
    ],
  },
];

const LIST_OTHER_INFO = [
  { name: "copyright", url: "" },
  { name: "termOfUse", url: "https://www.hdbank.com.vn/vi/term" },
  { name: "siteMap", url: "https://www.hdbank.com.vn/vi/sitemap" },
];

const LIST_ICON_APP = [
  {
    icon: fbIcon,
    url: "https://www.facebook.com/hdbankfanpage/",
  },
  {
    icon: zaloIcon,
    url: "https://zalo.me/1148028551726591727",
  },
  { icon: titokIcon, url: "https://www.tiktok.com/@hdbankvietnam" },
  { icon: youtubeIcon, url: "https://www.youtube.com/c/HDBankOfficial" },
];

const SectionFooter = () => {
  const classes = useStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { locale } = useRouter();
  const router = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "footer"]);

  const _redirect = (url: string) => {
    if (!url) {
      return;
    }
    router.push(url);
  };

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
                      {info.url ? (
                        <a href={info.url}>{info.name}</a>
                      ) : (
                        info.name
                      )}
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
              <Grid
                onClick={() => _redirect(item.url)}
                key={index}
                item
                xs="auto"
                className={item.url && classes.pointer}
              >
                <Box
                  px={isMobile ? 1 : 2}
                  className={
                    index !== LIST_OTHER_INFO.length - (isMobile ? 2 : 1)
                      ? classes.borderRight
                      : ""
                  }
                >
                  {t[item.name]}
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
                      <a
                        href="https://play.google.com/store/apps/details?id=com.vnpay.hdbank"
                        target="_blank"
                      >
                        <Image src={googlePlayIcon} alt="google-play" />
                      </a>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <a
                        href="https://itunes.apple.com/vn/app/hdbank/id1461658565?mt=8"
                        target="_blank"
                      >
                        <Image src={appStoreIcon} alt="app-store" />
                      </a>
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
                  <Grid
                    onClick={() => _redirect(item.url)}
                    className={classes.pointer}
                    key={index}
                    item
                    xs="auto"
                  >
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
