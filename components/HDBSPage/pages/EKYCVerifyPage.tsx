import React from "react";
import Head from "next/head";
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
    <>
      <Head>
        <title>Định danh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.root}>
        <EKYCComponent onFinish={onSubmit} />
      </div>
    </>
  );
};

export default EKYCVerifyPage;
