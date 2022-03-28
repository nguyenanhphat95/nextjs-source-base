import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import cn from "classnames";
import { LINK_VERIFY_CALLBACK_SBH_OTP } from "commons/constants";
import { CheckSessionOTPCode } from "commons/constants/sbhOTP";
import {
  ERROR_CODE,
  ERROR_CODE_OTP_PAGE,
  getStatusResponseOtpPage,
} from "commons/helpers";
import { CountDownTimer, InputOTP, PopupNotify } from "components/commons";
import { TypeInputOTP } from "components/commons/InputOTP";
import { KEY_VERIFY_OTP_FAIL, NUMBER_FAILED } from "components/STKPage/const";
import { SbhPurchaseInfo } from "interfaces/ISbhOTP";
import { STATUS_ID } from "interfaces/LockUser/IUpdateLeadStatus";
import { UpdateNumberFailRequest } from "interfaces/LockUser/IUpdateNumberFail";
import _get from "lodash/get";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as lockUserService from "services/lockUserService";
import * as sbhOTPServices from "services/sbhOTPService";
import * as qs from "query-string";
import { writeLogApi } from "services/commonService";

const useStyles = makeStyles(() => ({
  root: {
    margin: "100px 40px",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContent: {
    fontSize: 15,
    fontWeight: 400,
    textAlign: "center",
  },
  textResendOTP: {
    textAlign: "center",
    color: "#16884A",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },
  textTime: {
    color: "#9F1E1E",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
  },
  textCenter: {
    textAlign: "center",
  },
  textTimer: {
    color: "#BE1128",
  },
  disabledResentOTP: {
    color: "#ccc",
    cursor: "not-allowed",
  },
}));

const OTPPage = () => {
  const classes = useStyles();

  const router = useRouter();
  const query = router.query;

  const bTxnId = useRef<string>("");
  const campaignId = useRef<string>("");
  const leadId = useRef<string>("");
  const userId = useRef<string>("");

  const [purchaseInfo, setPurchaseInfo] = useState<SbhPurchaseInfo>();
  const [popupNotify, setPopupNotify] = useState({
    open: false,
    title: "",
    desc: "",
    onClose: () => null,
  });

  const [manageLock, setManageLock] = useState<{
    [KEY_VERIFY_OTP_FAIL]: UpdateNumberFailRequest;
  }>({
    [KEY_VERIFY_OTP_FAIL]: {},
  });

  const [otp, setOtp] = useState("");
  const [validPage, setValidPage] = useState(false);
  const [isResendValid, setIsResendValid] = useState(false);

  useEffect(() => {
    if (!query?.userId) {
      return;
    }

    lockUserService
      .getNumberFailApi(`${KEY_VERIFY_OTP_FAIL}_${query.userId}`)
      .then((res) => {
        setManageLock({
          [KEY_VERIFY_OTP_FAIL]: {
            value: res?.data?.value || 0,
            key: _get(res, "data.key"),
          },
        });
      });
  }, [query.userId]);

  useEffect(() => {
    if (!query.data) {
      return;
    }

    async function callApi() {
      const resCheckSession = await sbhOTPServices.checkSessionOTPApi(
        bTxnId.current
      );
      if (
        resCheckSession?.response?.responseCode === CheckSessionOTPCode.valid
      ) {
        const resInfo = await sbhOTPServices.getInfoByTokenApi(bTxnId.current);
        setPurchaseInfo(resInfo.data);
        setValidPage(true);
      }

      if (
        resCheckSession?.response?.responseCode === CheckSessionOTPCode.expired
      ) {
        const resInfo = await sbhOTPServices.getInfoByTokenApi(bTxnId.current);
        setPurchaseInfo(resInfo.data);
        if (resInfo?.response?.responseCode === ERROR_CODE.Success) {
          _callPurchaseSbh(resInfo.data);
        }
      }
    }

    function getNumberLockAccount() {
      if (!userId.current) {
        toggleNotify("Thông báo", "Thiếu userId");
        return;
      }
      lockUserService
        .getNumberFailApi(`${KEY_VERIFY_OTP_FAIL}_${userId.current}`)
        .then((res) => {
          setManageLock({
            [KEY_VERIFY_OTP_FAIL]: {
              value: res?.data?.value || 0,
              key: _get(res, "data.key"),
            },
          });
        });
    }

    if (typeof query.data === "string") {
      const queryStr = decodeURIComponent(escape(window.atob(query.data)));
      const queryParse = qs.parse(queryStr);

      bTxnId.current = queryParse?.bTxnId as string;
      campaignId.current = queryParse?.campaignId as string;
      leadId.current = queryParse?.leadId as string;
      userId.current = queryParse?.userId as string;
      writeLogApi({
        content: "SBH_OTP_URL_BEFORE_PARSE",
        body: {
          url: query.data,
        },
      });
      writeLogApi({
        content: "SBH_OTP_URL_AFTER_PARSE",
        body: queryParse,
      });
      callApi();
      getNumberLockAccount();
    }
  }, [query]);

  useEffect(() => {
    if (otp && otp.length === 6) {
      _handleVerifyOTP();
    }
  }, [otp]);

  const _callPurchaseSbh = (purchaseInfoParam?: SbhPurchaseInfo) => {
    const formData = purchaseInfoParam || purchaseInfo;

    if (!formData) {
      return;
    }

    sbhOTPServices.purchaseSbhApi(formData).then((resPurchase) => {
      const code = _get(resPurchase, "response.responseCode");
      const status = getStatusResponseOtpPage(code);
      isResendValid && setIsResendValid(false);

      if (status.success) {
        setValidPage(true);
        bTxnId.current = resPurchase?.data?.bTxnId;
      } else {
        toggleNotify("Thông báo", status.msg);
      }
    });
  };

  const _getStatusIdByKey = (key: string): STATUS_ID => {
    switch (key) {
      case KEY_VERIFY_OTP_FAIL: {
        return STATUS_ID.LOCK_VERIFY_OTP;
      }
      default: {
        return STATUS_ID.LOCK_LOGIN;
      }
    }
  };

  const _updateLeadStatus = (typeLock: string) => {
    if (!leadId.current || !campaignId.current || !userId.current) {
      toggleNotify("Thông báo", "Thiếu leadId, campaignId hoặc userId");
      return;
    }

    lockUserService
      .updateLeadStatus(
        leadId.current as string,
        campaignId.current as string,
        _getStatusIdByKey(typeLock),
        userId.current as string
      )
      .then((res) => {
        _updateNumberFail(typeLock, 0);
      });
  };
  const _updateNumberFail = (typeLock: string, numberLock?: any) => {
    const dataFail = _get(manageLock, [typeLock]);
    if (!dataFail || +dataFail.value === NUMBER_FAILED) {
      return;
    }
    const dataFailUpdate = {
      ...dataFail,
      value: numberLock === 0 ? numberLock : +dataFail.value + 1,
    };

    lockUserService.updateNumberFailApi(dataFailUpdate).then((res) => {
      setManageLock({
        ...manageLock,
        [typeLock]: dataFailUpdate,
      });
      if (+dataFailUpdate.value === NUMBER_FAILED) {
        // Call api update load status
        _updateLeadStatus(typeLock);
      }
    });
  };

  const _handleVerifyOTP = () => {
    if (!bTxnId.current) {
      toggleNotify("Thông báo", "Thiếu bTxnId");
      return;
    }
    sbhOTPServices.verifySbhOTPApi(otp, bTxnId.current).then((res) => {
      const code = _get(res, "response.responseCode");
      const status = getStatusResponseOtpPage(code);
      let urlRedirect = LINK_VERIFY_CALLBACK_SBH_OTP;
      if (status.success) {
        _updateNumberFail(KEY_VERIFY_OTP_FAIL, null);
        urlRedirect = urlRedirect
          ?.replace("{error}", "success")
          .replace("{txid}", res?.data?.txnId || "")
          .replace("&error={error_message}&error_code={error_code}", "");
        urlRedirect && router.push(urlRedirect);
        return;
      }
      if (code === ERROR_CODE_OTP_PAGE.OtpInvalid) {
        _updateNumberFail(KEY_VERIFY_OTP_FAIL);
      }
      toggleNotify("Thông báo", status.msg);
      // urlRedirect = urlRedirect
      //   ?.replace("{error}", "error")
      //   .replace("{txid}", res?.data?.txnId || "")
      //   .replace("{error_message}", message)
      //   .replace("{error_code}", code);
      // urlRedirect && router.push(urlRedirect);
    });
  };

  const _resendOtp = () => {
    if (!isResendValid) {
      return;
    }
    _callPurchaseSbh();
  };

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
  return (
    <div className={classes.root}>
      <Script id="jsencrypt-id" src="/sso/js/jsencrypt.min.js" />
      <Script id="md5-id" src="/sso/js/md5.min.js" />
      {popupNotify.open && (
        <PopupNotify
          title={popupNotify.title}
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}
      <Grid container direction="column" spacing={2}>
        <Grid item className={classes.textCenter}>
          <img src={"/sso/images/HDBanklogo.png"} alt="hdbank-logo" />
        </Grid>
        <Grid item className={classes.textHeader}>
          Xác thực OTP thanh toán
        </Grid>
        <Grid item className={classes.textContent}>
          Mã xác thực (OTP) đã được gửi qua SMS hoặc đăng nhập Mobile App HDBank
          để lấy OTP thanh toán số tiền {purchaseInfo?.amount}₫
        </Grid>
        <Grid item>
          <InputOTP typeInputOTP={TypeInputOTP.Single} onChange={setOtp} />
        </Grid>
        <Grid item className={classes.textContent}>
          Quý khách không nhận được tin nhắn?
        </Grid>
        <Grid
          item
          className={cn(
            classes.textResendOTP,
            !isResendValid && classes.disabledResentOTP
          )}
          onClick={_resendOtp}
        >
          Gửi lại OTP
        </Grid>
        <Grid item className={classes.textCenter}>
          {!isResendValid && (
            <CountDownTimer
              onFinish={() => setIsResendValid(true)}
              hoursMinSecs={{
                hours: 0,
                minutes: 1,
                seconds: 30,
              }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OTPPage;
