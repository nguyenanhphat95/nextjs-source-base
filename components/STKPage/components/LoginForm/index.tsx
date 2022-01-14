import React, { useState, ChangeEvent, useContext } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { InputCustom, ButtonCustom } from "components/commons";
import { makeStyles } from "@mui/styles";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
import { toast } from "react-toastify";
import STKContext from "components/STKPage/contexts/STKContextValue";

import _get from "lodash/get";
import cn from "classnames";
const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    borderRadius: 20,
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
  },
  labelInfoLogin: {
    fontWeight: 500,
    fontSize: 16,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 500,
  },
  textCenter: {
    textAlign: "center",
  },
  textForgot: {
    color: "#1890FF",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
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
          <Box className={cn(classes.textCenter, classes.subTitle)}>
            {t?.subtitle1}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={cn(classes.textCenter, classes.subTitle)}>
            {t?.subtitle2}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box className={classes.labelInfoLogin}>Thông tin đăng nhập</Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <InputCustom
                id="username"
                placeholder={t?.username}
                variant="outlined"
                value={formData.username}
                onChange={_handleChange}
                label={t?.username}
              />
            </Grid>
            <Grid item>
              <InputCustom
                id="password"
                placeholder={t?.password}
                variant="outlined"
                value={formData.password}
                onChange={_handleChange}
                type="password"
                label={t?.password}
              />
            </Grid>

            <Grid item>
              <Box mt={3} justifyContent="center" display="flex">
                <ButtonCustom
                  variant="contained"
                  color="secondary"
                  loading={loadingBtnSubmit}
                  onClick={_handleSubmit}
                >
                  {t?.btnSubmit}
                </ButtonCustom>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box className={classes.textForgot}>Quên tên đăng nhập/mật khẩu</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
