import React from "react";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Image from "next/image";

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
    borderStyle: "dotted",
    borderColor: "red",
    background: "white",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 15,
    cursor: "pointer",
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
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div className={classes.item} onClick={onSelect}>
            <Grid container direction="column">
              <Grid item>
                <Image width={50} height={50} src={openStockIcon} />
              </Grid>

              <Grid item>
                <Box px={2}>{t?.openStockAccount}</Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
