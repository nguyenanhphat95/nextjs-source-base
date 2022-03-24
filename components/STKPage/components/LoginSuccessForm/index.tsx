import React, { useContext, useMemo } from "react";

import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

// import tickSquareIcon from "public/images/TickSquare.png";
import { ButtonCustom } from "components/commons";
import _get from "lodash/get";
import STKContext from "components/STKPage/contexts/STKContextValue";
import { getMobileOperatingSystem } from "commons/helpers/helper";
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
  const mobileOperation = getMobileOperatingSystem();

  const link = useMemo(() => {
    if (mobileOperation === "unknown" || mobileOperation === "Windows Phone") {
      return "";
    }
    if (mobileOperation === "Android") {
      return "https://play.google.com/store/apps/details?id=com.vnpay.hdbank";
    }
    if (mobileOperation === "iOS") {
      return "https://apps.apple.com/vn/app/hdbank/id1461658565";
    }
    return "";
  }, [mobileOperation]);

  return (
    <Box py={3} px={2} className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <img src="/sso/images/TickSquare.png" alt="tick square" />
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.title}>
            <Grid container justifyContent="center">
              <Grid item xs={11}>
                {t.title}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item>
          <Box className={classes.textCenter}>
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                {t.subtitle1}
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.textCenter}>
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                {t.subtitle2}
              </Grid>
            </Grid>
          </Box>
        </Grid> */}
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
              <a target="_blank" href={link}>
                <ButtonCustom
                  variant="outlined"
                  className={classes.btnDownload}
                >
                  {t.btnDownApp}
                </ButtonCustom>
              </a>
            </Box>
          </Grid>
        </Grid>

        <Box mt={2} className={classes.textInstruction}>
          <Grid container justifyContent="center">
            <Grid item xs={9}>
              <a
                target="_blank"
                href="https://hdbank.com.vn/api/download?fileName=/news/editor/K092c4jYI9X3HRyoGGfr20200807110715%2F%40%40%40N7840PTI7872NVOTIKHO7842NIMONEYT7914APPHDBANK_1596773981740.pdf"
              >
                {t.textInstruction}
              </a>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSuccessForm;
