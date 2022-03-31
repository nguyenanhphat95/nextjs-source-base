import React from "react";
import { makeStyles } from "@mui/styles";

const TIME_CLOSE_POPUP = 180;

export interface TimerInput {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  hoursMinSecs?: TimerInput;
  onFinish?: () => void;
  onChange: (time: { hours: number; minutes: number; seconds: number }) => void;
  textBeforeTime?: string;
  textAfterTime?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const CountDownTimer = (props: Props) => {
  const classes = useStyles();
  const { hoursMinSecs, onFinish, onChange, textBeforeTime, textAfterTime } =
    props;
  const { hours, minutes, seconds } = hoursMinSecs
    ? hoursMinSecs
    : {
        hours: 0,
        minutes: 0,
        seconds: TIME_CLOSE_POPUP,
      };
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () => setTime([hours, minutes, seconds]);

  React.useEffect(() => {
    onChange &&
      onChange({
        hours: hrs,
        minutes: mins,
        seconds: secs,
      });
  }, [hrs, mins, secs]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  React.useEffect(() => {
    if (!secs) {
      onFinish && onFinish();
    }
  }, [secs]);

  return (
    <div className={classes.root}>
      {textBeforeTime}
      <span>
        ({`${hrs ? hrs.toString().padStart(2, "0") + ":" : ""}${
          mins ? mins.toString().padStart(2, "0") + ":" : ""
        }${secs.toString().padStart(2, "0")}`}
        s)
      </span>
      {textAfterTime}
    </div>
  );
};

export default CountDownTimer;
