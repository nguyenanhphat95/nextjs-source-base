import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import _get from "lodash/get";
import Head from "next/head";
import { getLanguage } from "commons/helpers";

const useStyles = makeStyles(() => ({
  rootPage: {
    minHeight: "100vh",
    position: "relative",
    paddingTop: "20vh",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  textComingSoon: {
    position: "absolute",
    top: 0,
    fontSize: "10px",
    fontWeight: 600,
    left: "50%",
    color: "#454F5B",
    background: "#ffba0f",
    padding: "2px 4px",
    borderRadius: "10px",
  },
  textDescription: {
    fontSize: "12px",
    color: "#464646",
    fontWeight: 400,
  },

  wrapperImage: {
    position: "relative",
    textAlign: "center",
  },
}));

const ComingSoonDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);
  return (
    <>
      <Head>
        <title>Đăng ký mở tài khoản chứng khoán</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={classes.rootPage}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <div className={classes.wrapperImage}>
              <img
                width={90}
                height={90}
                src="/asset/images/openStockAccount.svg"
              />
              <div className={classes.textComingSoon}>{t?.textComingSoon}</div>
            </div>
          </Grid>
          {/* <Grid item>
            <Box textAlign="center" className={classes.textComingSoon}>
              {t?.textComingSoon}
            </Box>
          </Grid> */}

          <Grid item>
            <Box textAlign="center" className={classes.textDescription}>
              {t?.textThankTo}
            </Box>
            <Box textAlign="center" className={classes.textDescription}>
              {t?.textDescription}
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ComingSoonDetail;
