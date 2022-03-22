import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { getLanguage } from "commons/helpers";
import resources from "pages/assets/translate.json";
import _get from "lodash/get";
import Head from "next/head";

const useStyles = makeStyles(() => ({
  rootPage: {
    minHeight: "100vh",
    position: "relative",
    paddingTop: "20vh",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  textComingSoon: {
    fontSize: "22px",
    color: "#464646",
    fontWeight: 600,
  },
  textDescription: {
    fontSize: "12px",
    color: "#464646",
    fontWeight: 400,
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
        <title>Chứng khoán</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={classes.rootPage}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box textAlign="center">
              <img width={120} src="/asset/images/coming-soon-detail.png" />
            </Box>
          </Grid>
          <Grid item>
            <Box textAlign="center" className={classes.textComingSoon}>
              {t?.textComingSoon}
            </Box>
          </Grid>

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
