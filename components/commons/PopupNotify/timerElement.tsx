import { startTimer } from "commons/helpers";
import React, { useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@mui/styles";

const TIME_CLOSE_POPUP = 180;

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    textAlign: "center",
  },
}));

interface Props {
  toggleModal: () => void;
  iconNotify?: React.ReactNode;
  title?: string;
  description?: string;
  textAutoClose?: string;
}

export const TimerElement = (props: Props) => {
  const timerRef = useRef<any>();
  const classes = useStyles();
  const { toggleModal, textAutoClose } = props;

  const onCallTimer = useCallback(async () => {
    const isDone = await startTimer(TIME_CLOSE_POPUP, timerRef.current);
    if (isDone) {
      toggleModal();
    }
  }, []);
  useEffect(() => {
    onCallTimer();
  }, []);

  return (
    <div className={classes.root}>
      {textAutoClose} <span ref={timerRef} />
    </div>
  );
};

export default TimerElement;
