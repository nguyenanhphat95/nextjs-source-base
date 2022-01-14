import React from "react";
import { makeStyles } from "@mui/styles";
import EKYCComponent from "../components/EKYCVerify";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface Props {
  onSubmit: (data: any) => void;
}

const EKYCVerifyPage = (props: Props) => {
  const classes = useStyles();
  const { onSubmit } = props;

  return (
    <div className={classes.root}>
      <EKYCComponent onFinish={onSubmit} />
    </div>
  );
};

export default EKYCVerifyPage;
