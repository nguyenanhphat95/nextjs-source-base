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

import desktopPic from "public/images/desktop.png";
import bannerMobile from "public/images/sbh/banner.png";
import STKContext from "components/STKPage/contexts/STKContextValue";
import _get from "lodash/get";
import { UpdateNumberFailRequest } from "interfaces/LockUser/IUpdateNumberFail";
import { STATUS_ID } from "interfaces/LockUser/IUpdateLeadStatus";
import {
  KEY_LOGIN_FAIL,
  KEY_VERIFY_OTP_FAIL,
  KEY_SEND_OTP_FAIL,
  NUMBER_FAILED,
  ERROR_MESSAGE_VERIFY_USER,
  LOGIN_STEP,
  TIME_LOCK_LOGIN_FAIL,
} from "components/STKPage/const";

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

  const [manageLock, setManageLock] = useState<{
    [KEY_LOGIN_FAIL]: UpdateNumberFailRequest;
    [KEY_VERIFY_OTP_FAIL]: UpdateNumberFailRequest;
    [KEY_SEND_OTP_FAIL]: UpdateNumberFailRequest;
  }>({
    [KEY_LOGIN_FAIL]: {},
    [KEY_VERIFY_OTP_FAIL]: {},
    [KEY_SEND_OTP_FAIL]: {},
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

  useEffect(() => {
    if (!query.nationaId || !query.nationaId) {
      return;
    }

    Promise.all([
      lockUserService.getNumberFailApi(`${KEY_LOGIN_FAIL}_${query.nationaId}`),
      lockUserService.getNumberFailApi(
        `${KEY_VERIFY_OTP_FAIL}_${query.nationaId}`
      ),
      lockUserService.getNumberFailApi(
        `${KEY_SEND_OTP_FAIL}_${query.nationaId}`
      ),
    ]).then((res) => {
      const [respLogin, respVerify, respSend] = res;
      setManageLock({
        [KEY_LOGIN_FAIL]: {
          value: respLogin?.data?.value || 0,
          key: _get(respLogin, "data.key"),
          expireTime: _get(respLogin, "data.expireTime", ""),
        },
        [KEY_VERIFY_OTP_FAIL]: {
          value: respVerify?.data?.value || 0,
          key: _get(respVerify, "data.key"),
          expireTime: _get(respVerify, "data.expireTime", ""),
        },
        [KEY_SEND_OTP_FAIL]: {
          value: respSend?.data?.value || 0,
          key: _get(respSend, "data.key"),
          expireTime: _get(respSend, "data.expireTime", ""),
        },
      });
    });
  }, [query.nationaId]);

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

  const _getStatusIdByKey = (key: string): STATUS_ID => {
    switch (key) {
      case KEY_LOGIN_FAIL: {
        return STATUS_ID.LOCK_LOGIN;
      }
      case KEY_VERIFY_OTP_FAIL: {
        return STATUS_ID.LOCK_VERIFY_OTP;
      }
      case KEY_SEND_OTP_FAIL: {
        return STATUS_ID.LOCK_SEND_OTP;
      }
      default: {
        return STATUS_ID.LOCK_LOGIN;
      }
    }
  };

  const _updateNumberFail = (typeLock: string, numberLock?: any) => {
    const getExpireTime = (numberLoginFail: number): string => {
      if (typeLock === KEY_LOGIN_FAIL && numberLoginFail === NUMBER_FAILED) {
        return TIME_LOCK_LOGIN_FAIL;
      }
      return "";
    };
    const dataFail = _get(manageLock, [typeLock]);
    if (!dataFail || +dataFail.value === NUMBER_FAILED) {
      return;
    }

    const dataFailUpdate = {
      ...dataFail,
      value: numberLock === null ? numberLock : dataFail.value + 1,
      expireTime: getExpireTime(dataFail.value + 1),
    };

    lockUserService.updateNumberFailApi(dataFailUpdate).then((res) => {
      setManageLock({
        ...manageLock,
        [typeLock]: dataFailUpdate,
      });

      if (+dataFailUpdate.value === NUMBER_FAILED) {
        // Call api update load status
        if (query.leadId || query.campaignId) {
          toggleNotify("Thông báo", "Thiếu leadId hoặc campaignId");
          return;
        }

        lockUserService
          .updateLeadStatus(
            query.leadId as string,
            query.campaignId as string,
            _getStatusIdByKey(typeLock)
          )
          .then((res) => {});
      }
    });
  };

  const _handleSubmitForm = async (
    _: any,
    data: { username: string; password: string }
  ) => {
    _updateNumberFail(KEY_LOGIN_FAIL);
    // const validUser = await _checkUser(
    //   data.username,
    //   query.nationaId as string
    // );
    // if (!validUser) {
    //   toggleNotify(
    //     "Thông báo",
    //     ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.UsernameNotMatch]
    //   );
    //   return;
    // }
    // const resp = await getPublicKey();
    // const publicKey = _get(resp, "data.data.key");
    // if (!publicKey) {
    //   toggleNotify("Thông báo", "Get public key error");
    //   return;
    // }
    // _toggleLoading("loadingBtnSubmit", true);
    // stkService
    //   .verifySBH(data, publicKey)
    //   .then((res) => {
    //     const responseCode = _get(res, "data.response.responseCode");
    //     _toggleLoading("loadingBtnSubmit");
    //     if (responseCode === ERROR_CODE.Success) {
    //       const cif = _get(res, "data.data.cif");
    //       stkService.getListAccountApi(cif).then((res) => {
    //         setListAccount(_get(res, "data.data", []));
    //       });
    //       usernameRef.current = data.username;
    //       passwordRef.current = data.password;
    //       setLoginStep(LOGIN_STEP.step2);
    //       return;
    //     }
    //     _updateNumberFail(KEY_LOGIN_FAIL);
    //     toggleNotify(
    //       "Thông báo",
    //       _get(ERROR_MESSAGE_VERIFY_USER, responseCode) ||
    //         ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.Unauthorized]
    //     );
    //   })
    //   .catch((err) => {
    //     toggleNotify(
    //       "Thông báo",
    //       ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.Timeout]
    //     );
    //     _toggleLoading("loadingBtnSubmit");
    //   });
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
          _get(ERROR_MESSAGE_VERIFY_USER, errorCode),
          ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.SendOTPFailed]
        );
      })
      .catch((err) => {
        toggleNotify(
          "Thông báo",
          ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.Timeout]
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
    _toggleLoading("loadingBtnSubmit", true);
    stkService
      .verifyOTPApi(usernameRef.current, otp)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        const errorCode = _get(res, "data.resultCode");
        if (_get(res, "data.data.userId")) {
          _updateNumberFail(KEY_VERIFY_OTP_FAIL, 0);
          setLoginStep(LOGIN_STEP.step4);
          return;
        }

        // If enter opt code failed, update number fail verify otp
        if (errorCode === ERROR_CODE.OTPInValid) {
          _updateNumberFail(KEY_VERIFY_OTP_FAIL);
          return;
        }

        toggleNotify(
          "Thông báo",
          _get(
            ERROR_MESSAGE_VERIFY_USER,
            errorCode,
            ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.OTPInValid]
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
          ERROR_MESSAGE_VERIFY_USER[ERROR_CODE.Timeout]
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
