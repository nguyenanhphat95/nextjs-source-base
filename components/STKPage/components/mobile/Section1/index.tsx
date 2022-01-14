import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";

import {
  ChooseAccountForm,
  LoginSuccessForm,
  ConfirmOTP,
  LoginForm,
} from "components/STKPage";
import { LOGIN_STEP } from "pages/sbh";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";

import _get from "lodash/get";
import _slice from "lodash/slice";

createTheme();
const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    position: "relative",
  },
  box: {
    marginTop: "-80px",
    borderRadius: 20,
    background: "#FFFFFF",
    boxShadow: "0px 14px 40px rgba(33, 43, 54, 0.1)",
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
  step: string;
  onChooseAccount: (value: string | number) => void;
  onConfirmOTP: (otp: string) => void;
  onVerifyWithToken: () => void;
  onSendOTP?: () => void;
  listAccount: any[];
}

const SectionMobile1 = (props: Props) => {
  const {
    onVerifyWithToken,
    onSubmit,
    step,
    onChooseAccount,
    onConfirmOTP,
    ...rest
  } = props;
  const classes = useStyles();

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "notification"]);

  const _handleSubmit = (data: { username: string; password: string }) => {
    const JSEnscript = _get(window, "JSEncrypt");
    onSubmit(JSEnscript, data);
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container direction="column">
          <Grid item>
            {step === LOGIN_STEP.step1 && (
              <LoginForm onSubmit={_handleSubmit} />
            )}
            {step === LOGIN_STEP.step2 && (
              <ChooseAccountForm onSubmit={onChooseAccount} {...rest} />
            )}
            {step === LOGIN_STEP.step3 && (
              <ConfirmOTP onSubmit={onConfirmOTP} {...rest} />
            )}
            {step === LOGIN_STEP.step4 && (
              <LoginSuccessForm onSubmit={onVerifyWithToken} />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SectionMobile1;
