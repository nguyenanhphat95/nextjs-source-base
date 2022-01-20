import React, { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SectionNotification } from "components/LoginPage";
import { PopupNotify } from "components/commons";

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
import { addHourFromNow } from "commons/helpers/date";

import desktopPic from "public/images/desktop.png";
import bannerMobile from "public/images/bannerMobile.png";
import STKContext from "components/STKPage/contexts/STKContextValue";
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
  [ERROR_CODE.PhoneNumberLock]: `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau hh:mm:ss để sử dụng tiếp dịch vụ.(${addHourFromNow(
    24
  )}) Nhấn Đóng quay trở về màn hình nhập thông tin ban đầu`,
  [ERROR_CODE.Unauthorized]:
    "Tên đăng nhập hoặc Mật khẩu không đúng. Quý khách vui lòng kiểm tra lại",
  [ERROR_CODE.SessionExpired]: "Session Expired",
  [ERROR_CODE.UserNotExist]: "User Not Exist",
  [ERROR_CODE.SessionIdNotFound]: "Session Id Not Found",
  [ERROR_CODE.FormatMessageInvalid]:
    "Tên đăng nhập hoặc Mật khẩu không hợp lệ. Qúy khách vui lòng kiểm tra lại",
  [ERROR_CODE.SystemError]: "System Error",
  [ERROR_CODE.PasswordExpired]:
    "Expired password requires accessing ebank.hdbank.com.vn to change password",
  [ERROR_CODE.VerifyClientFailed]: "Verify client failed",
  [ERROR_CODE.AccountLocked]:
    "Tài khoản của quý khách đã bị khóa. Quý khách có thể sử dụng dịch vụ Internet Banking để mở khóa. Hoặc gọi đến số 19006060  để được hỗ trợ.",
};

export const LOGIN_STEP = {
  step1: "stepLogin",
  step2: "stepChooseAccount",
  step3: "stepConfirmOtp",
  step4: "stepLoginSuccess",
};

const NUMBER_ALLOW_ENTER_WRONG_OTP = 5;

const SBHPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [popupNotify, setPopupNotify] = useState({
    open: false,
    title: "",
    desc: "",
  });

  const [countEnterWrongOTP, setCountEnterWrongOTP] = useState(0);
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
      toggleNotify("Thông báo", "Get public key error");
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
          return;
        }
        toggleNotify(
          "Thông báo",
          _get(ERROR_MESSAGE_VERIFY_USER, responseCode) ||
            ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.Unauthorized]
        );
      })
      .catch((err) => {
        toggleNotify("Thông báo", "Login failed");
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
        const errorCode = _get(res, "data.resultCode");
        if (_get(res, "data.data.userId")) {
          setLoginStep(LOGIN_STEP.step3);
        }
        toggleNotify(
          "Thông báo",
          _get(ERROR_MESSAGE_VERIFY_USER, errorCode, "Gửi OTP không thành công")
        );
      })
      .catch((err) => {
        toggleNotify("Thông báo", "Send OTP failed");
        _toggleLoading("loadingBtnSubmit", false);
        console.log(err);
      });
  };

  const _handleChooseAccount = (account: string | number) => {
    accountRef.current = account;
    _sendOTP();
  };

  const _handleConfirmOTP = (otp: string) => {
    if (countEnterWrongOTP === NUMBER_ALLOW_ENTER_WRONG_OTP) {
      toggleNotify(
        "Thông báo",
        `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau hh:mm:ss để sử dụng tiếp dịch vụ.(${addHourFromNow(
          24
        )}) Nhấn Đóng quay trở về màn hình nhập thông tin ban đầu`
      );
      return;
    }
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifyOTPApi(usernameRef.current, otp)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (_get(res, "data.data.userId")) {
          setLoginStep(LOGIN_STEP.step4);
          return;
        }
        setCountEnterWrongOTP((prev) => prev + 1);
        toggleNotify(
          "Thông báo",
          "Mã xác thực OTP không chính xác. Quý khách vui lòng nhập lại"
        );
      })
      .catch((err) => {
        // showToastError("Send OTP failed");
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
          toggleNotify(
            "Thông báo",
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
        toggleNotify("Thông báo", "Verify failed");
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

  function toggleNotify(title?: string, desc?: string) {
    setPopupNotify(() => {
      if (title && desc) {
        return {
          open: true,
          title,
          desc,
        };
      }
      return {
        open: false,
        title: "",
        desc: "",
      };
    });
  }

  const stkContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
    toggleNotify,
  };

  return (
    <Grid container direction="column">
      {popupNotify.open && (
        <PopupNotify
          title={popupNotify.title}
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}

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
