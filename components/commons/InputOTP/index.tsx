import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import { Grid } from "@mui/material";
import { isNumber } from "commons/helpers";
import _get from "lodash/get";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  otpInput: {
    width: "3rem",
    height: "3rem",
    fontSize: 18,
    textAlign: "center",
    borderRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    [theme.breakpoints.down("sm")]: {
      width: "2rem",
      height: "2rem",
    },
  },
}));

interface Props {
  onFinish?: (otp: string) => void;
  onChange?: (otp: string) => void;
  label?: string | React.ReactElement;
}

const InputOTP = (props: Props) => {
  const { onFinish, onChange, label } = props;

  const classes = useStyles();
  const otpEl1 = useRef<HTMLInputElement>(null);
  const [otpValue, setOtpValue] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  useEffect(() => {
    const el: any = otpEl1.current;
    el.focus();
  }, []);

  const _handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNumber(+value)) {
      let finalValue = {
        ...otpValue,
        [key]: e.target.value,
      };
      setOtpValue(finalValue);

      let finish = true;
      let otpStr = "";
      const keys = Object.keys(otpValue);
      keys.forEach((key) => {
        if (!_get(finalValue, [key])) {
          finish = false;
        }
        otpStr += _get(finalValue, [key]);
      });
      onChange && onChange(otpStr);
      if (finish && onFinish) {
        onFinish(otpStr);
      }
    }
  };

  const _handleFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Delete" || e.code === "Backspace") {
      const tabIndex = _get(e, "target.tabIndex");
      const next = tabIndex - 2;
      if (next > -1) {
        const element = _get(e, `target.form.elements[${next}]`);
        element && element.focus();
      }
    } else {
      const next = _get(e, "target.tabIndex");
      const value = _get(e, "target.value");

      if (next < 6 && value && isNumber(+value)) {
        const element = _get(e, `target.form.elements[${next}]`);
        element && element.focus();
      }
    }
  };

  return (
    <form>
      <Grid justifyContent="center" container spacing={2}>
        <Grid item xs="auto">
          <input
            ref={otpEl1}
            type="tel"
            name="otp-code"
            auto-complete="one-time-code"
            className={classes.otpInput}
            value={otpValue.otp1}
            onChange={(e) => _handleChange("otp1", e)}
            tabIndex={1}
            max={9}
            onKeyUp={_handleFocus}
            key={1}
            data-id={1}
          />
        </Grid>
        <Grid item xs="auto">
          <input
            name="otp-code"
            auto-complete="one-time-code"
            type="tel"
            className={classes.otpInput}
            value={otpValue.otp2}
            onChange={(e) => _handleChange("otp2", e)}
            tabIndex={2}
            max={9}
            onKeyUp={_handleFocus}
            key={2}
            data-id={2}
          />
        </Grid>

        <Grid item xs="auto">
          <input
            name="otp-code"
            auto-complete="one-time-code"
            type="tel"
            className={classes.otpInput}
            value={otpValue.otp3}
            onChange={(e) => _handleChange("otp3", e)}
            tabIndex={3}
            max={9}
            onKeyUp={_handleFocus}
            key={3}
            data-id={3}
          />
        </Grid>

        <Grid item xs="auto">
          <input
            name="otp-code"
            auto-complete="one-time-code"
            type="tel"
            className={classes.otpInput}
            value={otpValue.otp4}
            onChange={(e) => _handleChange("otp4", e)}
            tabIndex={4}
            max={9}
            onKeyUp={_handleFocus}
            key={4}
            data-id={4}
          />
        </Grid>

        <Grid item xs="auto">
          <input
            name="otp-code"
            auto-complete="one-time-code"
            type="tel"
            className={classes.otpInput}
            value={otpValue.otp5}
            onChange={(e) => _handleChange("otp5", e)}
            tabIndex={5}
            max={9}
            onKeyUp={_handleFocus}
            key={5}
            data-id={5}
          />
        </Grid>
        <Grid item xs="auto">
          <input
            name="otp-code"
            auto-complete="one-time-code"
            type="tel"
            className={classes.otpInput}
            value={otpValue.otp6}
            onChange={(e) => _handleChange("otp6", e)}
            tabIndex={6}
            max={9}
            onKeyUp={_handleFocus}
            key={6}
            data-id={6}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default InputOTP;
