import React, { useRef, useEffect, useCallback, useState } from "react";
//
import { useRouter } from "next/router";
import Script from "next/script";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { InputOTP } from "components/commons";
import {
  ERROR_CODE,
  getStatusResponseOtpPage,
  startTimer,
} from "commons/helpers";
import * as sbhOTPServices from "services/sbhOTPService";

// import HDBankLogo from "public/images/HDBanklogo.png";
import { CheckSessionOTPCode } from "commons/constants/sbhOTP";
import { SbhPurchaseInfo } from "interfaces/ISbhOTP";
import cn from "classnames";
import _get from "lodash/get";
import { LINK_VERIFY_CALLBACK_SBH_OTP } from "commons/constants";
import { PopupNotify } from "components/commons";
import { TypeInputOTP } from "components/commons/InputOTP";
import * as lockUserService from "services/lockUserService";
import {
  KEY_LOGIN_FAIL,
  KEY_VERIFY_OTP_FAIL,
  NUMBER_FAILED,
} from "components/STKPage/const";
import { UpdateNumberFailRequest } from "interfaces/LockUser/IUpdateNumberFail";
import { STATUS_ID } from "interfaces/LockUser/IUpdateLeadStatus";

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
  const timerRef = useRef<any>();

  const router = useRouter();
  const query = router.query;
  const bTxnId = useRef<string>("");

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
  const [validPage, setValidPage] = useState(true);
  const [isResendValid, setIsResendValid] = useState(false);

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(119, timerRef.current);
    isDone && setIsResendValid(true);
  }, []);

  useEffect(() => {
    timerRef.current && onCallTimer();
  }, [timerRef.current, validPage]);

  useEffect(() => {
    // if (!purchaseInfo?.accountNo) {
    //   return;
    // }
    if (!query?.userId || !query?.campaignId || !query.leadId) {
      toggleNotify("Thông báo", "Thiếu userId, campaignId hoặc leadId");
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
  }, [query]);

  useEffect(() => {
    // if (!query.uuid || !query.bTxnId) return;
    // bTxnId.current = query.bTxnId as string;
    // async function callApi() {
    //   const resCheckSession = await sbhOTPServices.checkSessionOTPApi(
    //     query.uuid as string
    //   );
    //   if (resCheckSession?.data?.code === CheckSessionOTPCode.valid) {
    //     const resInfo = await sbhOTPServices.getInfoByTokenApi(
    //       query.bTxnId as string
    //     );
    //     setPurchaseInfo(resInfo.data);
    //     setValidPage(true);
    //   }
    //   if (resCheckSession?.data?.code === CheckSessionOTPCode.expired) {
    //     const resInfo = await sbhOTPServices.getInfoByTokenApi(
    //       query.bTxnId as string
    //     );
    //     setPurchaseInfo(resInfo.data);
    //     if (resInfo?.response?.responseCode === ERROR_CODE.Success) {
    //       _callPurchaseSbh(resInfo.data);
    //     }
    //   }
    // }
    // callApi();
  }, [query.uuid, query.bTxnId]);

  useEffect(() => {
    if (otp && otp.length === 6) {
      _handleVerifyOTP();
    }
  }, [otp]);

  const _callPurchaseSbh = useCallback(
    (purchaseInfoParam?: SbhPurchaseInfo) => {
      const formData = purchaseInfoParam || purchaseInfo;

      if (!formData) {
        return;
      }

      sbhOTPServices.purchaseSbhApi(formData).then((resPurchase) => {
        const code = _get(resPurchase, "response.responseCode");
        const status = getStatusResponseOtpPage(code);

        if (status.success) {
          setValidPage(true);
          bTxnId.current = resPurchase?.data?.bTxnId;
        } else {
          toggleNotify("Thông báo", status.msg);
        }
      });
    },
    []
  );

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
    if (!query.leadId || !query.campaignId || !query.userId) {
      toggleNotify("Thông báo", "Thiếu leadId, campaignId hoặc userId");
      return;
    }

    lockUserService
      .updateLeadStatus(
        query.leadId as string,
        query.campaignId as string,
        _getStatusIdByKey(typeLock),
        query.userId as string
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
      value: numberLock === null ? numberLock : +dataFail.value + 1,
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
        urlRedirect = urlRedirect
          ?.replace("{error}", "success")
          .replace("{txid}", res?.data?.txnId || "")
          .replace("&error={error_message}&error_code={error_code}", "");

        urlRedirect && router.push(urlRedirect);
        return;
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
    if (!isResendValid || otp.length < 6) {
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
      <Script id="jsencrypt-id" src="/js/jsencrypt.min.js" />
      {popupNotify.open && (
        <PopupNotify
          title={popupNotify.title}
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}
      {validPage && (
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.textCenter}>
            <img src={"/sso/images/HDBanklogo.png"} alt="hdbank-logo" />
          </Grid>
          <Grid item className={classes.textHeader}>
            Xác thực OTP thanh toán
          </Grid>
          <Grid item className={classes.textContent}>
            Nhập mã đã được gửi đến số điện thoại của bạn để thanh toán số tiền{" "}
            {purchaseInfo?.amount}₫
          </Grid>
          <Grid item>
            <InputOTP typeInputOTP={TypeInputOTP.Single} onChange={setOtp} />
            {/* <InputOTP onChange={setOtp} /> */}
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
            <span className={classes.textTime} ref={timerRef} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default OTPPage;
