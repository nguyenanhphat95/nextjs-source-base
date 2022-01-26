import axios, { AxiosResponse } from "axios";
import {
  ListAccountResponse,
  ListAccountRequest,
} from "interfaces/IListAccount";
import {
  GetMerchantRequest,
  GetMerchantResponse,
} from "interfaces/IGetMerchant";
import {
  CheckUserENCYRequest,
  CheckUserEKYCResponse,
} from "interfaces/ICheckUserEKYS";
import {
  InquiryEKYCPresentRequest,
  InquiryEKYCPresentResponse,
} from "interfaces/IInquiryEKYCPresent";
import {
  ConfirmEKYCRequest,
  ConfirmEKYCResponse,
} from "interfaces/IConfirmEKYCPresent";
import {
  GetAccessTokenRequest,
  GetAccessTokenResponse,
} from "interfaces/IGetAccessToken";

import { v4 as uuidv4 } from "uuid";
import { FormDataFinal, MasterData } from "components/HDBSPage/interfaces";
import { addMinuteFromNow, getTodayWithFormat } from "commons/helpers/date";
import {
  CHANNEL_HDBS,
  IS_REQ_CHAL_CODE_HDBS,
  KEY_CHECK_SUM,
  KEY_TOKEN,
  NARRATIVE_HDBS,
  PARTNER_ID,
  SERVICE_CODE_HDBS,
  TOKEN_USERNAME,
  TOKEN_PASSWORD,
} from "commons/constants";
import { CreateOTPRequest, CreateOTPResponse } from "interfaces/ICreateOTP";
import { VerifyOTPRequest, VerifyOTPResponse } from "interfaces/IVerifyOTP";

import * as Cookies from "commons/helpers/cookies";
import axiosWrapper from "commons/helpers/axios/axios-instance";

import _omit from "lodash/omit";
import _get from "lodash/get";

let userId: string;
let clientNo: string;
let language: string = "VI";
let tokenExpired: string;

// let userId: string = "0915423641";
// let clientNo: string = "02887123";
// let userId: string = "0903092112";
// let clientNo: string = "05961710";

export function updateMasterData(data: MasterData) {
  userId = data.userId;
  clientNo = data.clientNo;
  language = "VI";
}

function updateTokenExpired(expireIn: number) {
  tokenExpired = addMinuteFromNow(expireIn / 60 - 5, "MM/dd/yyyy H:mm:ss");
}

function generateCommonBodyRequest() {
  return {
    requestId: uuidv4() as string,
    language,
    transactionTime: getTodayWithFormat(),
  };
}

const refreshAccessToken = async () => {
  const today = new Date();
  const timeToday = today.getTime();

  const expired = new Date(tokenExpired);
  const timeExpired = expired.getTime();
  if (timeToday > timeExpired) {
    return await getAccessToken();
  }
  return Promise.resolve(true);
};

function generateCheckSum(object: Record<string, string>): string {
  const md5 = _get(window, "md5");
  let str = "";
  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  str += KEY_CHECK_SUM;
  return md5(str);
}

export const getAccessToken = async () => {
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: GetAccessTokenRequest = {
    requestId,
    language,
    channel: CHANNEL_HDBS as string,
    transactionTime,
    userName: TOKEN_USERNAME as string,
    password: TOKEN_PASSWORD as string,
    checksum: generateCheckSum({
      userName: TOKEN_USERNAME as string,
      password: TOKEN_PASSWORD as string,
      transactionTime,
    }),
  };
  const resp: AxiosResponse<GetAccessTokenResponse> = await axios.post(
    "/api/getAccessToken",
    body
  );
  const token = _get(resp, "data.accessToken");
  const expired = _get(resp, "data.expiryIn");
  if (token) {
    Cookies.set(KEY_TOKEN, token);
  }
  if (expired) {
    updateTokenExpired(expired);
  }
  return resp.data;
};

export const getMerchant = async () => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: GetMerchantRequest = {
    requestId,
    language,
    channel: CHANNEL_HDBS as string,
    transactionTime,
    partnerId: PARTNER_ID as string,
    checksum: generateCheckSum({
      partnerId: PARTNER_ID as string,
      transactionTime,
    }),
  };
  const resp: AxiosResponse<GetMerchantResponse> = await axiosWrapper.post(
    "/api/getMerchant",
    body,
    {
      headers: {
        Authorization: Cookies.get(KEY_TOKEN) || "",
      },
    }
  );
  return resp.data;
};

export const checkUserEKYC = async (merchantId: string, terminalId: string) => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: CheckUserENCYRequest = {
    requestId,
    language,
    transactionTime,
    channel: CHANNEL_HDBS as string,
    clientNo,
    merchantId,
    terminalId,
    userId,
    partnerId: PARTNER_ID as string,
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      merchantId,
      terminalId,
      partnerId: PARTNER_ID as string,
    }),
  };

  const resp: AxiosResponse<CheckUserEKYCResponse> = await axios.post(
    "/api/checkUserEKYC",
    body,
    {
      headers: {
        Authorization: Cookies.get(KEY_TOKEN) || "",
      },
    }
  );
  return resp.data;
};

export const inquiryENCYPresent = async (data: FormDataFinal) => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();

  const body: InquiryEKYCPresentRequest = {
    ..._omit(data, [
      "ekycData",
      "merchantName",
      "terminalName",
      "ekycData",
      "isBond",
      "isTranInternet",
      "isUttb",
    ]),
    requestId,
    channel: CHANNEL_HDBS as string,
    ekyType: "CURRENT_CUSTOMER",
    userId,
    clientNo,
    transactionTime,
    partnerId: PARTNER_ID as string,
    language,
    faceMatching: "Y",
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      partnerId: PARTNER_ID as string,
    }),
  };
  const resp: AxiosResponse<InquiryEKYCPresentResponse> = await axios.post(
    "/api/inquiryEKYCPresent",
    body,
    {
      headers: {
        Authorization: Cookies.get(KEY_TOKEN) || "",
      },
    }
  );
  return resp.data;
};

export const confirmEKYCPresent = async (data: FormDataFinal) => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: ConfirmEKYCRequest = {
    requestId,
    channel: CHANNEL_HDBS as string,
    userId,
    clientNo,
    transactionTime,
    partnerId: PARTNER_ID as string,
    isTranInternet: data.isTranInternet,
    isUttb: data.isUttb,
    isBond: data.isBond,
    language,
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      partnerId: PARTNER_ID as string,
    }),
  };
  const resp: AxiosResponse<ConfirmEKYCResponse> = await axios.post(
    "/api/confirmEKYCPresent",
    body,
    {
      headers: {
        Authorization: Cookies.get(KEY_TOKEN) || "",
      },
    }
  );
  return resp.data;
};

export const getListAccountApi = async () => {
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

export const createOTPApi = async () => {
  const { requestId } = generateCommonBodyRequest();
  const body: CreateOTPRequest = {
    requestId,
    data: {
      channel: CHANNEL_HDBS as string,
      serviceCode: SERVICE_CODE_HDBS as string,
      userId,
      serialNo: "",
      narrative: NARRATIVE_HDBS as string,
      language: "vi",
      clientImei: "",
      partner: "",
      isReqChalCode: IS_REQ_CHAL_CODE_HDBS as string,
      mediaType: "",
    },
  };
  const resp: AxiosResponse<CreateOTPResponse> = await axios.post(
    "/api/createOTP",
    body
  );
  return resp;
};

export const verifyOTPApi = async (otp: string) => {
  const body: VerifyOTPRequest = {
    requestId: uuidv4() as string,
    data: {
      channel: CHANNEL_HDBS as string,
      serviceCode: SERVICE_CODE_HDBS as string,
      userId,
      serialNo: "",
      narrative: NARRATIVE_HDBS as string,
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
