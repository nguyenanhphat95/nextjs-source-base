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
import * as lockUserService from "services/lockUserService";
import { ParsedUrlQuery } from "querystring";

import { AccountItem } from "interfaces/IListAccount";

import {
  ERROR_CODE,
  generateRequestBody,
  handleErrorWithResponse,
} from "commons/helpers";
import { addHourFromNow } from "commons/helpers/date";

import desktopPic from "public/images/desktop.png";
import bannerMobile from "public/images/sbh/banner.png";
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
  [ERROR_CODE.OTPInValid]:
    "Mã xác thực OTP không chính xác. Quý khách vui lòng nhập lại",
  [ERROR_CODE.OTPExpired]:
    "Mã xác thực đã hết thời gian hiệu lực. Quý khách vui lòng lấy lại mã xác thực mới.",
  [ERROR_CODE.PhoneNumberLock]: `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau để sử dụng tiếp dịch vụ.(${addHourFromNow(
    24
  )})`,
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
    "Tài khoản của Quý khách đang bị tạm khóa. Vui lòng thử lại sau 24 giờ để sử dụng tiếp dịch vụ",
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
    onClose: () => null,
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
      !query.scope ||
      !query.nationaId
    ) {
      return false;
    }
    return true;
  }, []);

  // useEffect(() => {
  //   if (!query.nationaId) {
  //     return;
  //   }
  //   lockUserService
  //     .getNumberLoginFailApi(query.nationaId as string)
  //     .then((res) => {
  //       console.log("res-:", res);
  //     });
  // }, [query.nationaId]);

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
    return <div></div>;
  }

  const _checkUser = async (
    userId: string,
    globalId: string
  ): Promise<boolean> => {
    if (!userId || !globalId) {
      return false;
    }
    const res = await stkService.checkUserApi(userId, globalId);
    if (_get(res, "data.status") === ERROR_CODE.Success) {
      return true;
    }
    return false;
  };

  const _handleSubmitForm = async (
    _: any,
    data: { username: string; password: string }
  ) => {
    const validUser = await _checkUser(
      data.username,
      query.nationaId as string
    );

    if (!validUser) {
      toggleNotify(
        "Thông báo",
        "Quý khách vui lòng sử dụng username đã đăng ký ban đầu"
      );
      return;
    }

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
        toggleNotify(
          "Thông báo",
          "Kết nối gián đoạn. Qúy khách vui lòng thử lại sau"
        );
        _toggleLoading("loadingBtnSubmit");
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
          return;
        }
        toggleNotify(
          "Thông báo",
          _get(ERROR_MESSAGE_VERIFY_USER, errorCode, "Gửi OTP không thành công")
        );
      })
      .catch((err) => {
        toggleNotify(
          "Thông báo",
          "Kết nối gián đoạn. Qúy khách vui lòng thử lại sau"
        );
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
        `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau 24h để sử dụng tiếp dịch vụ.(${addHourFromNow(
          24
        )})`
      );
      return;
    }
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifyOTPApi(usernameRef.current, otp)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        const errorCode = _get(res, "data.resultCode");
        if (_get(res, "data.data.userId")) {
          setLoginStep(LOGIN_STEP.step4);
          return;
        }
        setCountEnterWrongOTP((prev) => prev + 1);
        toggleNotify(
          "Thông báo",
          _get(
            ERROR_MESSAGE_VERIFY_USER,
            errorCode,
            "Mã xác thực OTP không chính xác. Quý khách vui lòng nhập lại"
          )
        );
      })
      .catch((err) => {
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
        toggleNotify(
          "Thông báo",
          "Kết nối gián đoạn. Qúy khách vui lòng thử lại sau"
        );
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

  function toggleNotify(title?: string, desc?: string, onClose?: any) {
    setPopupNotify((prev) => {
      if (title && desc) {
        return {
          open: true,
          title,
          desc,
          onClose: onClose ? onClose : () => null,
        };
      }
      prev.onClose && prev?.onClose();
      return {
        open: false,
        title: "",
        desc: "",
        onClose: () => null,
      };
    });
  }

  const stkContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
    toggleNotify,
    setLoginStep,
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
