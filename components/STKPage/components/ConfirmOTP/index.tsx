import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InputOTP, ButtonCustom } from "components/commons";
import { startTimer } from "commons/helpers";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import cn from "classnames";
import _get from "lodash/get";
import STKContext from "components/STKPage/contexts/STKContextValue";
import { LOGIN_STEP } from "pages/sbh";
import { TypeInputOTP } from "components/commons/InputOTP";
const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    borderRadius: 20,
  },
  header: {
    fontWeight: 500,
    fontSize: 22,
    textAlign: "center",
  },
  caption: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 400,
  },
  label: {
    fontWeight: 500,
  },
  textCenter: {
    textAlign: "center",
  },
  textLink: {
    color: "#f22b42",
    fontWeight: 500,
    cursor: "pointer",
  },
  textTimer: {
    color: "#6F7279",
  },
  disabledResentOTP: {
    color: "#ccc",
    cursor: "not-allowed",
  },
}));

interface Props {
  onSubmit: (otp: string) => void;
  onSendOTP?: () => void;
}

const NUMBER_ALLOW_RESEND_OTP = 5;
const MSG_MAXIMUM_SEND_OTP =
  "Quý khách đã nhận OTP quá 5 lần. Vui lòng thử lại sau 24 giờ để sử dụng tiếp dịch vụ";
const ConfirmOTP = (props: Props) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const { onSubmit, onSendOTP } = props;
  const { loadingBtnSubmit, toggleNotify, setLoginStep } =
    useContext(STKContext);

  const timerRef = useRef<any>();

  const [otp, setOtp] = useState("");
  const [isResendValid, setIsResendValid] = useState(false);
  const [countResendOTP, setCountResendOTP] = useState(0);

  const t = _get(resources, [locale || LANGUAGE.VI, "confirmOTP"]);

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(119, timerRef.current);
    isDone && setIsResendValid(true);
  }, []);

  useEffect(() => {
    onCallTimer();
  }, []);

  const _handleResendOTP = () => {
    if (countResendOTP === NUMBER_ALLOW_RESEND_OTP) {
      toggleNotify &&
        toggleNotify("Thông báo", MSG_MAXIMUM_SEND_OTP, _handleClosePopup);
      return;
    }
    if (!isResendValid || !onSendOTP) {
      return;
    }
    onSendOTP();
    setIsResendValid(false);
    onCallTimer();
    setCountResendOTP((prev) => prev + 1);
  };

  function _handleClosePopup() {
    console.log("_handleClosePopup");
    setLoginStep && setLoginStep(LOGIN_STEP.step1);
  }

  return (
    <Box py={3} px={2} className={classes.root}>
      <Grid direction="column" container spacing={3}>
        <Grid item className={classes.header}>
          {t.title}
        </Grid>
        <Grid item className={classes.caption}>
          {t.content}
        </Grid>
        <Grid item>
          <Grid direction="column" container spacing={1}>
            <Grid item className={cn(classes.textCenter, classes.label)}>
              {t.label}
            </Grid>
            <Grid item className={cn(classes.textCenter)}>
              <InputOTP typeInputOTP={TypeInputOTP.Single} onChange={setOtp} />
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid
                  item
                  xs={8}
                  className={cn(classes.textCenter, classes.caption)}
                >
                  {t.question}{" "}
                  <span
                    onClick={_handleResendOTP}
                    className={cn(
                      classes.textCenter,
                      classes.textLink,
                      !isResendValid && classes.disabledResentOTP
                    )}
                  >
                    {t.resendOTP}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={cn(classes.textCenter)}>
              <span className={classes.textTimer} ref={timerRef} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Box display="flex" justifyContent="center">
            <ButtonCustom
              variant="contained"
              color="secondary"
              disabled={otp.length < 6}
              onClick={() => onSubmit(otp)}
              loading={loadingBtnSubmit}
            >
              {t.btnSubmit}
            </ButtonCustom>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmOTP;
