import React, { useRef, useEffect, useCallback, useState } from "react";
//
import { useRouter } from "next/router";
import Script from "next/script";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { InputOTP } from "components/commons";
import { ERROR_CODE, startTimer } from "commons/helpers";
import * as sbhOTPServices from "services/sbhOTPService";

// import HDBankLogo from "public/images/HDBanklogo.png";
import { CheckSessionOTPCode } from "commons/constants/sbhOTP";
import { SbhPurchaseInfo } from "interfaces/ISbhOTP";
import cn from "classnames";
import _get from "lodash/get";
import { LINK_VERIFY_CALLBACK_SBH_OTP } from "commons/constants";
import { PopupNotify } from "components/commons";
import { TypeInputOTP } from "components/commons/InputOTP";

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
    if (!query.uuid || !query.bTxnId) return;
    bTxnId.current = query.bTxnId as string;
    async function callApi() {
      const resCheckSession = await sbhOTPServices.checkSessionOTPApi(
        query.uuid as string
      );

      if (resCheckSession?.data?.code === CheckSessionOTPCode.valid) {
        const resInfo = await sbhOTPServices.getInfoByTokenApi(
          query.bTxnId as string
        );
        setPurchaseInfo(resInfo.data);
        setValidPage(true);
      }

      if (resCheckSession?.data?.code === CheckSessionOTPCode.expired) {
        const resInfo = await sbhOTPServices.getInfoByTokenApi(
          query.bTxnId as string
        );
        if (resInfo?.response?.responseCode === ERROR_CODE.Success) {
          _callPurchaseSbh(resInfo.data);
        }
      }
    }

    callApi();
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
        if (resPurchase?.response?.responseCode === ERROR_CODE.Success) {
          setValidPage(true);
          bTxnId.current = resPurchase?.data?.bTxnId;
        } else {
          toggleNotify("Thông báo", "Gửi otp không thành công");
        }
      });
    },
    []
  );

  const _handleVerifyOTP = () => {
    if (!bTxnId.current) {
      toggleNotify("Thông báo", "Thiếu bTxnId");
      return;
    }
    sbhOTPServices.verifySbhOTPApi(otp, bTxnId.current).then((res) => {
      const code = _get(res, "response.responseCode");
      const message = _get(res, "response.responseMessage");
      let urlRedirect = LINK_VERIFY_CALLBACK_SBH_OTP;

      if (code === ERROR_CODE.Success) {
        urlRedirect = urlRedirect
          ?.replace("{error}", "success")
          .replace("{txid}", res?.data?.txnId || "")
          .replace("&error={error_message}&error_code={error_code}", "");

        urlRedirect && router.push(urlRedirect);
        return;
      }
      toggleNotify("Thông báo", "Mã xác thực không đúng");
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
