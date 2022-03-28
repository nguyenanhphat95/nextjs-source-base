import { CheckUserResponse } from "./../interfaces/ICheckUser";
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
  AccountItem,
} from "interfaces/IListAccount";
import { VerifyOTPRequest, VerifyOTPResponse } from "interfaces/IVerifyOTP";
import { v4 as uuidv4 } from "uuid";
import { VerifySBHRequest } from "interfaces/IVerifySBH";
import _get from "lodash/get";
import {
  VerifyWithTokenSBHRequest,
  VerifyWithTokenSBHResponse,
} from "interfaces/IVerifyWithTokenSBH";
import { CheckUserRequest } from "interfaces/ICheckUser";

// Condition to filter list account 701;704;714;715;790;791;700;710;708;718;719;712;794;702;7SV;7ZR;7PR;7PL;7CO;7SG;70G;70M;799;7OL
export function filterListAccount(data: AccountItem[]): AccountItem[] {
  if (data && data.length) {
    return data.filter((item) => {
      if (
        item.AcctType === "701" ||
        item.AcctType === "704" ||
        item.AcctType === "714" ||
        item.AcctType === "715" ||
        item.AcctType === "790" ||
        item.AcctType === "791" ||
        item.AcctType === "700" ||
        item.AcctType === "710" ||
        item.AcctType === "708" ||
        item.AcctType === "718" ||
        item.AcctType === "719" ||
        item.AcctType === "712" ||
        item.AcctType === "794" ||
        item.AcctType === "702" ||
        item.AcctType === "7SV" ||
        item.AcctType === "7ZR" ||
        item.AcctType === "7PR" ||
        item.AcctType === "7PL" ||
        item.AcctType === "7CO" ||
        item.AcctType === "7SG" ||
        item.AcctType === "70G" ||
        item.AcctType === "70M" ||
        item.AcctType === "799" ||
        item.AcctType === "7O"
      ) {
        return item;
      }
    });
  }
  return [];
}

export const getListAccountApi = async (clientNo: string) => {
  const body: ListAccountRequest = {
    requestId: uuidv4() as string,
    data: {
      clientNo,
    },
  };
  const resp: AxiosResponse<ListAccountResponse> = await axios.post(
    "/sso/api/getAccountByCif",
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
    "/sso/api/createOTP",
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
    "/sso/api/verifyOTP",
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

  const resp: AxiosResponse<any> = await axios.post("/sso/api/verifySBH", body);
  return resp;
};

export const verifyWithTokenSBH = async (
  data: {
    username: string;
    password: string;
  },
  bankAccount: string,
  publicKey: string,
  txid: string
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
      bankAccount: bankAccountEncrypted + `#${txid}`,
    },
  };

  const resp: AxiosResponse<VerifyWithTokenSBHResponse> = await axios.post(
    "/sso/api/verifyWithTokenSBH",
    body
  );
  return resp;
};

export const checkUserApi = async (userId: string, globalId: string) => {
  const body: CheckUserRequest = {
    requestId: uuidv4() as string,
    data: {
      userId,
      globalId,
    },
  };
  const resp: AxiosResponse<CheckUserResponse> = await axios.post(
    "/sso/api/checkUser",
    body
  );
  return resp.data;
};
