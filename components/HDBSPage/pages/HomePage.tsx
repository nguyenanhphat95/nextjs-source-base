import React from "react";
import Head from "next/head";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
// import Image from "next/image";

import { getLanguage } from "commons/helpers";

import resources from "pages/assets/translate.json";
import _get from "lodash/get";
import openStockIcon from "public/asset/images/openStockAccount.svg";

const useStyles = makeStyles(() => ({
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
}));

interface Props {
  onSelect: () => void;
}

const HomePage = (props: Props) => {
  const classes = useStyles();
  const { onSelect } = props;

  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);
  console.log("Home page update");
  return (
    <>
      <Head>
        <title>Chứng khoán</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className={classes.item} onClick={onSelect}>
              <Grid container direction="column">
                <Grid item>
                  <img
                    width={30}
                    height={30}
                    src="/asset/images/openStockAccount.svg"
                  />
                </Grid>

                <Grid item>
                  <Box px={1}>{t?.openStockAccount}</Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
