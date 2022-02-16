import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { InputOTP } from "components/commons";
import { ERROR_CODE, startTimer } from "commons/helpers";
import * as sbhOTPServices from "services/sbhOTPService";

import HDBankLogo from "public/images/HDBanklogo.png";
import { CheckSessionOTPCode } from "commons/constants/sbhOTP";
import { SbhPurchaseInfo } from "interfaces/ISbhOTP";

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
}));

const OTPPage = () => {
  const classes = useStyles();
  const timerRef = useRef<any>();
  const router = useRouter();
  const query = router.query;

  const purchaseInfo = useRef<SbhPurchaseInfo>();
  const bTxnId = useRef<string>("");

  const [validPage, setValidPage] = useState(false);
  const [isResendValid, setIsResendValid] = useState(false);

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(119, timerRef.current);
    isDone && setIsResendValid(true);
  }, []);

  useEffect(() => {
    timerRef.current && onCallTimer();
  }, [timerRef]);

  useEffect(() => {
    if (!query.uuid || !query.token) return;

    async function callApi() {
      setTimeout(async () => {
        const resCheckSession = await sbhOTPServices.checkSessionOTPApi(
          query.uuid as string
        );
      }, 1000);

      // if (resCheckSession?.data?.code === CheckSessionOTPCode.valid) {
      //   setValidPage(true);
      // }

      // if (resCheckSession?.data?.code === CheckSessionOTPCode.expired) {
      //   const resInfo = await sbhOTPServices.getInfoByTokenApi(
      //     query.token as string
      //   );
      //   if (resInfo?.response?.responseCode === ERROR_CODE.Success) {
      //     purchaseInfo.current = {
      //       ...resInfo.data,
      //       tokenizeId: "c9094a63-fcef-4f51-8668-67e3ce22ebaf",
      //     };
      //     purchaseInfo.current = resInfo.data;
      //     const resPurchase = await sbhOTPServices.purchaseSbhApi(
      //       purchaseInfo.current
      //     );

      //     if (resPurchase?.response?.responseCode === ERROR_CODE.Success) {
      //       setValidPage(true);
      //       bTxnId.current = resPurchase?.data?.bTxnId;
      //     }
      //   }
      // }
    }

    callApi();
  }, [query.uuid, query.token]);

  // const _handleVerify = (otp: string) => {
  //   sbhOTPServices.verifySbhOTPApi(otp, bTxnId.current).then((res) => {
  //     console.log("verifySbhOTPApi---:", res);
  //   });
  // };

  return (
    <div className={classes.root}>
      <Script id="jsencrypt-id" src="/js/jsencrypt.min.js" />
      {validPage && (
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.textCenter}>
            <Image src={HDBankLogo} alt="hdbank-logo" />
          </Grid>
          <Grid item className={classes.textHeader}>
            Xác thực OTP thanh toán
          </Grid>
          <Grid item className={classes.textContent}>
            Nhập mã đã được gửi đến số điện thoại của bạn để thanh toán số tiền
            114.000₫
          </Grid>
          <Grid item>
            <InputOTP onFinish={_handleVerify} />
          </Grid>
          <Grid item className={classes.textContent}>
            Quý khách không nhận được tin nhắn?
          </Grid>
          <Grid item className={classes.textResendOTP}>
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
