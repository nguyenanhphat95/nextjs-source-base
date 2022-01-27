import React, { useState, useContext } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import { useForm, Controller, Resolver, FieldErrors } from "react-hook-form";

import { Grid, Box } from "@mui/material";
import { InputCustom, ButtonCustom } from "components/commons";
import { makeStyles } from "@mui/styles";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
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
type FormValues = {
  username: string;
  password: string;
};

const getErrorMessage = (
  errors: FieldErrors,
  key: string,
  requiredMsg?: string,
  minLengthMsg?: string
) => {
  const typeMaxLength = _get(errors, `${key}.type`);
  if (typeMaxLength === "minLength") {
    return minLengthMsg;
  }
  if (typeMaxLength === "required") {
    return requiredMsg;
  }
};

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "loginForm"]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loadingBtnSubmit, toggleNotify } = useContext(STKContext);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputCustom
                      regex={new RegExp(/^[a-z0-9@_-]+$/i)}
                      maxLength={100}
                      errorMsg={getErrorMessage(
                        errors,
                        "username",
                        "Xin vui lòng nhập Tên đăng nhập của bạn"
                      )}
                      placeholder={t?.username}
                      variant="outlined"
                      label={t?.username}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <InputCustom
                      maxLength={21}
                      regex={new RegExp(/^\S*$/)}
                      errorMsg={getErrorMessage(
                        errors,
                        "password",
                        "Xin vui lòng nhập Mật khẩu của bạn",
                        "Mật khẩu phải có độ dài tối thiếu 6 ký tự"
                      )}
                      placeholder={t?.password}
                      variant="outlined"
                      type="password"
                      label={t?.password}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Box mt={3} justifyContent="center" display="flex">
                  <ButtonCustom
                    variant="contained"
                    color="secondary"
                    loading={loadingBtnSubmit}
                    type="submit"
                  >
                    {t?.btnSubmit}
                  </ButtonCustom>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12}>
          <Box
            onClick={() =>
              toggleNotify &&
              toggleNotify(
                "Thông báo",
                "Quý khách vui lòng liên hệ 19006060 hoặc đến điểm giao dịch HDBank gần nhất để được hỗ trợ.Trân trọng cảm ơn!"
              )
            }
            className={classes.textForgot}
          >
            Quên tên đăng nhập/mật khẩu
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
