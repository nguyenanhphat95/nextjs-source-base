import { Box } from "@mui/material";
import _get from "lodash/get";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { SIGNATURE } from "commons/constants";
import ChangePassword from "components/ChangePasswordPage";
import Otp from "components/ChangePasswordPage/OtpPage";
import { ERROR_MESSAGE_VERIFY_USER } from "components/STKPage/const";
import Script from "next/script";
import SectionHeader from "components/ChangePasswordPage/Header";
import SectionFooter from "components/ChangePasswordPage/Footer";
import Layout from "components/ChangePasswordPage/Layout";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { ResponseData } from "interfaces/ICommon";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import { generateRequestBody } from "commons/helpers";
export interface VerifyUserResponse extends ResponseData {}

export async function getServerSideProps(router: any) {
  const { credential, client_id, redirect_uri } = router.query;
  const body = {
    request: {
      requestId: uuidv4(),
      requestTime: "",
    },
    data: {
      clientId: client_id as string,
      clientSecret: "",
      redirectUri: redirect_uri as string,
    },
  };
  console.log(body);

  try {
    const url = `${process.env.API_DOMAIN}/oauth2/api/verify_client`;
    const resp: AxiosResponse<VerifyUserResponse> = await axiosWrapper.post(
      url,
      body
    );
    if(resp.data.response.responseCode != "00"){
      throw Error("verify client failed")
    }
    const user = jwt.verify(credential, SIGNATURE as string);
    return {
      props: {
        user,
      },
    };
  } catch (e) {
    writeLog(
      ip.address(),
      new Date(),
      `Verify user api: ${_get(e, "message")}`,
      JSON.stringify(body)
    );
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
  const [code, setCode] = React.useState<string>("");

  const onSubmit = async (
    oldPass: string,
    newPass: string,
    publicKey: string,
    code: string
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
    setCode(code);
    setCre(credential);
    setStep("02");
  };

  return (
    <Box>
      <Script id="jsencrypt-id" src="/sso-changePassword/js/jsencrypt.min.js" />
      <SectionHeader />
      <Layout>
        {step === "01" && <ChangePassword onSubmit={onSubmit} user={user} />}
        {step === "02" && (
          <Otp code={code} user={user} cre={cre} publicKey={publicKey} />
        )}
      </Layout>
      <SectionFooter />
    </Box>
  );
}

export default changePasswordPage;
