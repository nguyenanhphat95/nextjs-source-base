import React, { useState, ChangeEvent, useContext } from "react";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { InputCustom, ButtonCustom } from "components/commons";
import { makeStyles } from "@mui/styles";

import userIcon from "public/images/user.png";
import passIcon from "public/images/pwd.png";
import rightIcon from "public/images/rightloging.png";
import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
import { toast } from "react-toastify";
import _get from "lodash/get";
import STKContext from "components/STKPage/contexts/STKContextValue";
const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    borderRadius: 20,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 500,
  },
  textCenter: {
    textAlign: "center",
  },
  textForgot: {
    textDecorationLine: "underline",
    fontSize: 16,
  },
  btnCustomRegister: {
    borderColor: "#333333 !important",
    color: "#333333 !important",
  },
  personalLeft: {
    background: "#F00020",
    fontWeight: 600,
    borderRadius: "12px 0px 0px 12px",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    paddingTop: 14,
    paddingBottom: 14,
  },
  enterpriseRight: {
    border: "1px solid #B1B5C9",
    fontWeight: 600,
    borderRadius: "0px 12px 12px 0px",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 14,
    paddingBottom: 14,
  },
}));

interface Props {
  onSubmit: (data: { username: string; password: string }) => void;
}

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "loginForm"]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { loadingBtnSubmit } = useContext(STKContext);

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const _handleSubmit = () => {
    if (!formData.username || !formData.password) {
      toast.error("Please enter username and password");
      return;
    }
    onSubmit(formData);
  };
  return (
    <Box py={3} px={2} className={classes.root}>
      <Script id="jsencrypt-id" src="/js/jsencrypt.min.js" />
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Box
            className={classes.loginTitle}
            display="flex"
            justifyContent="center"
          >
            {t?.title}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid item xs={6} md={5} className={classes.personalLeft}>
                  {t?.personal}
                </Grid>
                <Grid item xs={6} md={5} className={classes.enterpriseRight}>
                  {t?.enterprise}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <InputCustom
                InputProps={{
                  startAdornment: <Image src={userIcon} alt="username" />,
                }}
                id="username"
                placeholder={t?.username}
                variant="outlined"
                value={formData.username}
                onChange={_handleChange}
              />
            </Grid>
            <Grid item>
              <InputCustom
                InputProps={{
                  startAdornment: <Image src={passIcon} alt="username" />,
                }}
                id="password"
                placeholder={t?.password}
                variant="outlined"
                value={formData.password}
                onChange={_handleChange}
                type="password"
              />
            </Grid>

            <Grid item>
              <ButtonCustom
                startIcon={<Image src={rightIcon} alt="icon-right" />}
                variant="contained"
                color="secondary"
                fullWidth
                loading={loadingBtnSubmit}
                onClick={_handleSubmit}
              >
                {t?.btnSubmit}
              </ButtonCustom>
            </Grid>

            <Grid item className={classes.textCenter}>
              <span className={classes.textForgot}>{t?.cantLogin}</span>
            </Grid>

            <Grid item>
              <ButtonCustom
                startIcon={<Image src={rightIcon} alt="icon-right" />}
                variant="outlined"
                fullWidth
                className={classes.btnCustomRegister}
              >
                {t?.registerAccount}
              </ButtonCustom>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
