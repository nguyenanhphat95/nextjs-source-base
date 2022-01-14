import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import { LoginForm } from "components/LoginPage";
import { LIST_NOTIFICATION } from "components/LoginPage/SectionNotification";
import _slice from "lodash/slice";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
import _get from "lodash/get";

createTheme();
const useStyles = makeStyles(() => ({
  root: {
    background: "linear-gradient(167.6deg, #FFAC41 7.65%, #DA3A20 89.4%)",
    padding: 16,
  },
  title: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
  },
  notifyItem: {
    background: "white",
    borderRadius: 12,
    height: "100%",
  },
  wrapperImage: {
    "&  > span": {
      width: "100% !important",
    },
  },
  nameNotify: {
    fontWeight: 600,
    fontSize: 10,
  },
  contentNotify: {
    fontSize: 9,
  },
}));

interface Props {
  onSubmit: (
    JSEnscript: any,
    data: { username: string; password: string }
  ) => void;
}

const SectionMobile1 = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "notification"]);

  const _handleSubmit = (data: { username: string; password: string }) => {
    const JSEnscript = _get(window, "JSEncrypt");
    onSubmit(JSEnscript, data);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <LoginForm onSubmit={_handleSubmit} />
        </Grid>

        <Grid item>
          <Box mb={1} className={classes.title}>
            {t.title}
          </Box>
          <Grid container spacing={1}>
            {_slice(LIST_NOTIFICATION, 0, 2).map((item, index) => (
              <Grid key={index} item xs={6}>
                <Box className={classes.notifyItem}>
                  <Box className={classes.wrapperImage}>
                    <Image src={item.image} alt="icon-image" />
                  </Box>
                  <Box p={2}>
                    <div className={classes.nameNotify}>{t[item.title]}</div>
                    <div className={classes.contentNotify}>
                      {t[item.shortContent]}
                    </div>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionMobile1;
