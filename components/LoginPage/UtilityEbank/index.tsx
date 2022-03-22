import React from "react";
//
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

// import icon1 from "public/images/icon.png";
// import icon2 from "public/images/saveonlive.png";
// import icon4 from "public/images/tranfering.png";
// import icon5 from "public/images/bankplus.png";
// import icon6 from "public/images/factoring.png";
// import icon1 from "public/images/productHdbank/icon1.png";
// import icon2 from "public/images/productHdbank/icon2.png";
// import icon3 from "public/images/productHdbank/icon3.png";
// import icon4 from "public/images/productHdbank/icon4.png";
// import icon5 from "public/images/productHdbank/icon5.png";
// import icon6 from "public/images/productHdbank/icon6.png";
// import icon7 from "public/images/productHdbank/icon7.png";
// import icon9 from "public/images/efex.png";

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
    cursor: "pointer",
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
    icon: "/sso/images/productHdbank/icon1.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/san-pham-vay",
  },
  {
    title: "utility2",
    icon: "/sso/images/productHdbank/icon2.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/the",
  },
  {
    title: "utility3",
    icon: "/sso/images/productHdbank/icon3.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/san-pham-tien-gui",
  },
  {
    title: "utility4",
    icon: "/sso/images/productHdbank/icon4.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/ngoai-te",
  },
  {
    title: "utility5",
    icon: "/sso/images/productHdbank/icon5.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/ngan-hang-dien-tu",
  },
  {
    title: "utility6",
    icon: "/sso/images/productHdbank/icon6.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/bao-hiem",
  },
  {
    title: "utility7",
    icon: "/sso/images/productHdbank/icon7.png",
    url: "https://www.hdbank.com.vn/vi/personal/product/san-pham-dich-vu",
  },
];

const UtilityEbank = () => {
  const classes = useStyles();
  const { locale } = useRouter();
  const router = useRouter();

  const t = _get(resources, [locale || LANGUAGE.VI, "utilityBank"]);
  const _redirect = (url: string) => {
    router.push(url);
  };

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
                <div
                  onClick={() => _redirect(item.url)}
                  className={classes.eBankingItem}
                >
                  <Box mb={1} display="flex" justifyContent="center">
                    <img src={item.icon} alt="" />
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
