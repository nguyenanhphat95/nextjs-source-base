import React, { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SectionNotification } from "components/LoginPage";

import {
  SectionLogin,
  SectionMobile1,
  SectionHeader,
  SectionFooter,
} from "components/STKPage";

import { verifyClientApi, VerifyClientBody, getPublicKey } from "services";
import * as stkService from "services/stkService";
import { ParsedUrlQuery } from "querystring";

import { AccountItem } from "interfaces/IListAccount";

import {
  ERROR_CODE,
  generateRequestBody,
  handleErrorWithResponse,
} from "commons/helpers";
// import { CLIENT_SECRET } from "commons/constants";

import desktopPic from "public/images/desktop.png";
import bannerMobile from "public/images/bannerMobile.png";
import STKContext from "components/STKPage/contexts/STKContextValue";

import { showToastError, showToastSuccess } from "commons/helpers/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _get from "lodash/get";

createTheme();
const useStyles = makeStyles(() => ({
  banner: {
    "&  > span": {
      width: "100% !important",
    },
  },
  rootMobileUtility: {
    margin: "50px 40px",
  },
}));

export const ERROR_MESSAGE_VERIFY_USER = {
  [ERROR_CODE.Unauthorized]: "Username or password incorrect",
  [ERROR_CODE.SessionExpired]: "Session Expired",
  [ERROR_CODE.UserNotExist]: "User Not Exist",
  [ERROR_CODE.SessionIdNotFound]: "Session Id Not Found",
  [ERROR_CODE.FormatMessageInvalid]: "Format Message Invalid",
  [ERROR_CODE.SystemError]: "System Error",
  [ERROR_CODE.PasswordExpired]:
    "Expired password requires accessing ebank.hdbank.com.vn to change password",
  [ERROR_CODE.VerifyClientFailed]: "Verify client failed",
};

export const LOGIN_STEP = {
  step1: "stepLogin",
  step2: "stepChooseAccount",
  step3: "stepConfirmOtp",
  step4: "stepLoginSuccess",
};

const SBHPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loginStep, setLoginStep] = useState(LOGIN_STEP.step1);
  const [listAccount, setListAccount] = useState<AccountItem[]>([]);
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
  });

  const accountRef = useRef<string | number>("");
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const _checkHaveParam = useCallback((query: ParsedUrlQuery) => {
    if (
      !query.client_id ||
      !query.redirect_uri ||
      !query.response_type ||
      !query.scope
    ) {
      return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (!_checkHaveParam(query)) {
      return;
    }

    const body: VerifyClientBody = {
      ...generateRequestBody(),
      data: {
        clientId: query.client_id as string,
        clientSecret: "",
        redirectUri: query.redirect_uri as string,
      },
    };
    verifyClientApi(body)
      .then((resp) => {
        handleErrorWithResponse(router, resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, _checkHaveParam, router]);

  if (!_checkHaveParam(query)) {
    return <div>Invalid params</div>;
  }

  const _handleSubmitForm = async (
    _: any,
    data: { username: string; password: string }
  ) => {
    const resp = await getPublicKey();
    const publicKey = _get(resp, "data.data.key");

    if (!publicKey) {
      showToastError("Get public key error");
      return;
    }
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifySBH(data, publicKey)
      .then((res) => {
        const responseCode = _get(res, "data.response.responseCode");
        _toggleLoading("loadingBtnSubmit");

        if (responseCode === ERROR_CODE.Success) {
          const cif = _get(res, "data.data.cif");
          stkService.getListAccountApi(cif).then((res) => {
            setListAccount(_get(res, "data.data", []));
          });
          usernameRef.current = data.username;
          passwordRef.current = data.password;

          setLoginStep(LOGIN_STEP.step2);
          showToastSuccess("Login success");
          return;
        }
        showToastError(
          ERROR_MESSAGE_VERIFY_USER[responseCode] || "Login failed"
        );
      })
      .catch((err) => {
        showToastError("Login failed");
        _toggleLoading("loadingBtnSubmit");
        console.log(err);
      });
  };

  const _sendOTP = () => {
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .createOTPApi(usernameRef.current)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (_get(res, "data.data.userId")) {
          showToastSuccess("Send OTP success, please check your phone");
          setLoginStep(LOGIN_STEP.step3);
        }
      })
      .catch((err) => {
        showToastError("Send OTP failed");
        _toggleLoading("loadingBtnSubmit", false);
        console.log(err);
      });
  };

  const _handleChooseAccount = (account: string | number) => {
    accountRef.current = account;
    _sendOTP();
  };

  const _handleConfirmOTP = (otp: string) => {
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifyOTPApi(usernameRef.current, otp)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (_get(res, "data.data.userId")) {
          showToastSuccess("Confirm OTP success");
          setLoginStep(LOGIN_STEP.step4);
          return;
        }
        showToastError(_get(res, "data.data.resultMessage", "Invalid OTP"));
      })
      .catch((err) => {
        showToastError("Send OTP failed");
        _toggleLoading("loadingBtnSubmit", false);
        console.log(err);
      });
  };

  const _handleVerifyWithToken = async () => {
    const resp = await getPublicKey();
    const publicKey = _get(resp, "data.data.key");
    const formData = {
      username: usernameRef.current,
      password: passwordRef.current,
    };
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifyWithTokenSBH(formData, accountRef.current as string, publicKey)
      .then((res) => {
        const code = _get(res, "data.data.code");
        _toggleLoading("loadingBtnSubmit", false);
        if (!code) {
          const errorCode = _get(res, "data.response.responseCode");
          showToastError(
            ERROR_MESSAGE_VERIFY_USER[errorCode] || "Login failed"
          );
          return;
        }
        // Redirect to redirect uri
        router.push({
          pathname: query.redirect_uri as string,
          query: {
            code,
          },
        });
      })
      .catch((err) => {
        showToastError("Verify failed");
        _toggleLoading("loadingBtnSubmit", false);
        console.log(err);
      });
  };

  function _toggleLoading(field: string, isLoading?: boolean) {
    setLoading({
      ...loading,
      [field]: isLoading ? true : false,
    });
  }

  const stkContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
  };

  return (
    <Grid container direction="column">
      <ToastContainer
        theme="colored"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Grid item xs={12}>
        <SectionHeader />
      </Grid>

      {isMobile && (
        <>
          <Grid item xs={12}>
            <Box className={classes.banner}>
              <Image src={bannerMobile} alt="banner-mobile" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <STKContext.Provider value={stkContextValue}>
              <SectionMobile1
                listAccount={listAccount}
                step={loginStep}
                onSubmit={_handleSubmitForm}
                onChooseAccount={_handleChooseAccount}
                onConfirmOTP={_handleConfirmOTP}
                onVerifyWithToken={_handleVerifyWithToken}
                onSendOTP={_sendOTP}
              />
            </STKContext.Provider>
          </Grid>
        </>
      )}
      {!isMobile && (
        <>
          <Grid item xs={12}>
            <Box className={classes.banner}>
              <Image src={desktopPic} alt="desktop" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <STKContext.Provider value={stkContextValue}>
              <SectionLogin
                listAccount={listAccount}
                step={loginStep}
                onSubmit={_handleSubmitForm}
                onChooseAccount={_handleChooseAccount}
                onConfirmOTP={_handleConfirmOTP}
                onVerifyWithToken={_handleVerifyWithToken}
                onSendOTP={_sendOTP}
              />
            </STKContext.Provider>
          </Grid>

          <Grid item xs={12}>
            <SectionNotification />
          </Grid>
        </>
      )}
      <SectionFooter />
    </Grid>
  );
};

export default SBHPage;
