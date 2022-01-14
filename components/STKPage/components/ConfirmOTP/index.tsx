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
    color: "#1890FF",
    fontWeight: 500,
    cursor: "pointer",
  },
  textTimer: {
    color: "#BE1128",
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

const ConfirmOTP = (props: Props) => {
  const { onSubmit, onSendOTP } = props;
  const classes = useStyles();
  const timerRef = useRef<any>();

  const [otp, setOtp] = useState("");
  const [isResendValid, setIsResendValid] = useState(false);

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "confirmOTP"]);
  const { loadingBtnSubmit } = useContext(STKContext);

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(119, timerRef.current);
    isDone && setIsResendValid(true);
  }, []);

  useEffect(() => {
    onCallTimer();
  }, []);

  const _handleResendOTP = () => {
    if (!isResendValid || !onSendOTP) {
      return;
    }
    onSendOTP();
    setIsResendValid(false);
    onCallTimer();
  };

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
              <InputOTP onChange={setOtp} />
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
