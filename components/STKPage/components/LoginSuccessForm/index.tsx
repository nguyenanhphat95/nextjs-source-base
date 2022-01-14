import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import tickSquareIcon from "public/images/TickSquare.png";
import { ButtonCustom } from "components/commons";
import _get from "lodash/get";
import STKContext from "components/STKPage/contexts/STKContextValue";
createTheme();
const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    textAlign: "center",
  },
  btnDownload: {
    borderColor: "#333333 !important",
    color: "#333333 !important",
  },
  textInstruction: {
    textDecoration: "underline",
    fontWeight: 400,
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
}));

interface Props {
  onSubmit: () => void;
}

const LoginSuccessForm = (props: Props) => {
  const classes = useStyles();
  const { onSubmit } = props;

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "loginSuccessForm"]);
  const { loadingBtnSubmit } = useContext(STKContext);

  return (
    <Box py={3} px={2} className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <Image src={tickSquareIcon} alt="tick square" />
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.title}>{t.title}</Box>
        </Grid>
        <Grid item>
          <Box className={classes.textCenter}>{t.subtitle1}</Box>
          <Box className={classes.textCenter}>{t.subtitle2}</Box>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Box display="flex" justifyContent="center">
              <ButtonCustom
                onClick={onSubmit}
                color="secondary"
                variant="contained"
                loading={loadingBtnSubmit}
              >
                {t.btnContinue}
              </ButtonCustom>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box display="flex" justifyContent="center">
              <ButtonCustom variant="outlined" className={classes.btnDownload}>
                {t.btnDownApp}
              </ButtonCustom>
            </Box>
          </Grid>
        </Grid>

        <Box mt={2} className={classes.textInstruction}>
          {t.textInstruction}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSuccessForm;
