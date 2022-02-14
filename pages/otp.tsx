import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { InputOTP } from "components/commons";
import { startTimer } from "commons/helpers";

import HDBankLogo from "public/images/HDBanklogo.png";

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
  const [isResendValid, setIsResendValid] = useState(false);

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(119, timerRef.current);
    isDone && setIsResendValid(true);
  }, []);

  useEffect(() => {
    onCallTimer();
  }, []);

  return (
    <div className={classes.root}>
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
          <InputOTP />
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
    </div>
  );
};

export default OTPPage;
