import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getLanguage } from "commons/helpers";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React from "react";

const useStyles = makeStyles(() => ({
  rootPage: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    background: "white",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
  },
  wrapperImage: {
    position: "relative",
  },
  textComingSoon: {
    position: "absolute",
    top: 0,
    left: "50%",
    color: "#454F5B",
    background: "#ffba0f",
    padding: "2px 4px",
    borderRadius: "10px",
    fontSize: "8px",
  },
}));

const ComingSoonPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);

  return (
    <div className={classes.rootPage}>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={4}>
            <div className={classes.item}>
              <Grid container direction="column">
                <Grid item className={classes.wrapperImage}>
                  <img
                    width={40}
                    height={40}
                    src="/asset/images/openStockAccount.svg"
                  />
                  <div className={classes.textComingSoon}>
                    {t?.textComingSoon}
                  </div>
                </Grid>

                <Grid item>
                  <Box px={1}>{t?.openStockAccount}</Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ComingSoonPage;
