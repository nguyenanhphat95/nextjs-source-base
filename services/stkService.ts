import axios, { AxiosResponse } from "axios";
import {
  CHANNEL_SBH,
  IS_REQ_CHAL_CODE_SBH,
  NARRATIVE_SBH,
  SERVICE_CODE_SBH,
} from "commons/constants";
import { CreateOTPRequest, CreateOTPResponse } from "interfaces/ICreateOTP";
import {
  ListAccountResponse,
  ListAccountRequest,
} from "interfaces/IListAccount";
import { VerifyOTPRequest, VerifyOTPResponse } from "interfaces/IVerifyOTP";
import { v4 as uuidv4 } from "uuid";
import { VerifySBHRequest } from "interfaces/IVerifySBH";
import _get from "lodash/get";
import {
  VerifyWithTokenSBHRequest,
  VerifyWithTokenSBHResponse,
} from "interfaces/IVerifyWithTokenSBH";

export const getListAccountApi = async (clientNo: string) => {
  const body: ListAccountRequest = {
    requestId: uuidv4() as string,
    data: {
      clientNo,
    },
  };
  const resp: AxiosResponse<ListAccountResponse> = await axios.post(
    "/api/getAccountByCif",
    body
  );
  return resp;
};

export const createOTPApi = async (userId: string) => {
  const body: CreateOTPRequest = {
    requestId: uuidv4() as string,
    data: {
      channel: CHANNEL_SBH as string,
      serviceCode: SERVICE_CODE_SBH as string,
      userId,
      serialNo: "",
      narrative: NARRATIVE_SBH as string,
      language: "vi",
      clientImei: "",
      partner: "",
      isReqChalCode: IS_REQ_CHAL_CODE_SBH as string,
      mediaType: "",
    },
  };
  const resp: AxiosResponse<CreateOTPResponse> = await axios.post(
    "/api/createOTP",
    body
  );
  return resp;
};

export const verifyOTPApi = async (userId: string, otp: string) => {
  const body: VerifyOTPRequest = {
    requestId: uuidv4() as string,
    data: {
      channel: CHANNEL_SBH as string,
      serviceCode: SERVICE_CODE_SBH as string,
      userId,
      serialNo: "",
      narrative: NARRATIVE_SBH as string,
      mediaType: "",
      challengeCode: "",
      otp,
    },
  };
  const resp: AxiosResponse<VerifyOTPResponse> = await axios.post(
    "/api/verifyOTP",
    body
  );
  return resp;
};

export const verifySBH = async (
  data: {
    username: string;
    password: string;
  },
  publicKey: string
) => {
  const JSEnscript = _get(window, "JSEncrypt");
  const crypt = new JSEnscript();
  crypt.setPublicKey(publicKey);
  const credential = crypt.encrypt(JSON.stringify(data));
  const body: VerifySBHRequest = {
    request: {
      requestId: uuidv4() as string,
      requestTime: "",
    },
    data: {
      credential,
      key: publicKey,
    },
  };

  const resp: AxiosResponse<any> = await axios.post("/api/verifySBH", body);
  return resp;
};

export const verifyWithTokenSBH = async (
  data: {
    username: string;
    password: string;
  },
  bankAccount: string,
  publicKey: string
) => {
  const JSEnscript = _get(window, "JSEncrypt");
  const crypt = new JSEnscript();
  crypt.setPublicKey(publicKey);

  const credential = crypt.encrypt(JSON.stringify(data));
  const bankAccountEncrypted = crypt.encrypt(bankAccount);

  const body: VerifyWithTokenSBHRequest = {
    request: {
      requestId: uuidv4() as string,
      requestTime: "",
    },
    data: {
      credential,
      key: publicKey,
      bankAccount: bankAccountEncrypted,
    },
  };

  const resp: AxiosResponse<VerifyWithTokenSBHResponse> = await axios.post(
    "/api/verifyWithTokenSBH",
    body
  );
  return resp;
};
