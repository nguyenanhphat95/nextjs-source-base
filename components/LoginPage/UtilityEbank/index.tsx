import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import icon1 from "public/images/icon.png";
import icon2 from "public/images/saveonlive.png";
import icon3 from "public/images/wallet.png";
import icon4 from "public/images/tranfering.png";
import icon5 from "public/images/bankplus.png";
import icon6 from "public/images/factoring.png";
import icon7 from "public/images/ecredit.png";
import icon8 from "public/images/edrawdown.png";
import icon9 from "public/images/efex.png";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
import _get from "lodash/get";
createTheme();
const useStyles = makeStyles(() => ({
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: 500,
  },
  eBankingItem: {
    height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
}));

const LIST_E_BANKING = [
  {
    title: "utility1",
    icon: icon1,
  },
  {
    title: "utility2",
    icon: icon2,
  },
  {
    title: "utility3",
    icon: icon3,
  },
  {
    title: "utility4",
    icon: icon4,
  },
  {
    title: "utility5",
    icon: icon5,
  },
  {
    title: "utility6",
    icon: icon6,
  },
  {
    title: "utility7",
    icon: icon7,
  },
  {
    title: "utility8",
    icon: icon8,
  },
  {
    title: "utility9",
    icon: icon9,
  },
];

const UtilityEbank = () => {
  const classes = useStyles();
  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "utilityBank"]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <Box className={classes.title} display="flex" justifyContent="center">
          {t.title}
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            {LIST_E_BANKING.map((item, index) => (
              <Grid key={index} item xs={4} md={4}>
                <div className={classes.eBankingItem}>
                  <Box mb={1} display="flex" justifyContent="center">
                    <Image src={item.icon} alt="" />
                  </Box>
                  <Box className={classes.textCenter}>{t[item.title]}</Box>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UtilityEbank;
