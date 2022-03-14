import { Box } from "@mui/material";
import _get from "lodash/get";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { SIGNATURE } from "commons/constants";
import ChangePassword from "components/ChangePasswordPage";
import Otp from "components/OtpPage";
import { ERROR_MESSAGE_VERIFY_USER } from "components/STKPage/const";
import Script from "next/script";

export async function getServerSideProps(router: any) {
  const { token } = router.query;
  try {
    const user = jwt.verify(token, SIGNATURE as string);
    return {
      props: {
        user,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

interface IUser {
  user: { user: string; clientNo: string; phone: string };
}

function changePasswordPage({ user }: IUser) {
  const [step, setStep] = React.useState<string>("01");
  const [publicKey, setPublickey] = React.useState<string>("");
  const [cre, setCre] = React.useState<string>("");


  const onSubmit = async (
    oldPass: string,
    newPass: string,
    publicKey: string
  ) => {
    const reqData = {
      username: user.user,
      oldPass: oldPass,
      newPass: newPass,
    };
    const JSEnscript = _get(window, "JSEncrypt");
    const crypt = new JSEnscript();
    crypt.setPublicKey(publicKey);
    const credential = crypt.encrypt(JSON.stringify(reqData));
    setPublickey(publicKey);
    setCre(credential)
    setStep("02");
  };

  return (
    <Box>
      <Script id="jsencrypt-id" src="/sso/js/jsencrypt.min.js" />
      {step === "01" && <ChangePassword onSubmit={onSubmit} user={user} />}
      {step === "02" && <Otp user={user} onChangeStep={() => setStep("01")} cre={cre} publicKey={publicKey} />}
    </Box>
  );
}

export default changePasswordPage;
