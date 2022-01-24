import { CHANNEL_SBH } from "./../commons/constants/index";
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
import { getTodayWithFormat } from "commons/helpers/date";
import {
  CHANNEL_HDBS,
  IS_REQ_CHAL_CODE_SBH,
  KEY_CHECK_SUM,
  KEY_TOKEN,
  NARRATIVE_SBH,
  PARTNER_ID,
  SERVICE_CODE_SBH,
  TOKEN_USERNAME,
  TOKEN_PASSWORD,
} from "commons/constants";
import { CreateOTPRequest, CreateOTPResponse } from "interfaces/ICreateOTP";

import * as Cookies from "commons/helpers/cookies";
import axiosWrapper from "commons/helpers/axios/axios-instance";

import _omit from "lodash/omit";
import _get from "lodash/get";

let userId: string;
let clientNo: string;
// let userId: string = "0915423641";
// let clientNo: string = "02887123";
// let userId: string = "0903092112";
// let clientNo: string = "05961710";
let language: string = "VI";
export let accessToken: string = "";

export function updateMasterData(data: MasterData) {
  userId = data.userId;
  clientNo = data.clientNo;
  language = data.language;
  accessToken = data.accessToken;
}

function generateCommonBodyRequest() {
  return {
    requestId: uuidv4() as string,
    language,
    transactionTime: getTodayWithFormat(),
  };
}

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
  if (token) {
    Cookies.set(KEY_TOKEN, token);
  }
  return resp.data;
};

export const getMerchant = async () => {
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
    accessToken,
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
  const { requestId, language, transactionTime } = generateCommonBodyRequest();

  const body: InquiryEKYCPresentRequest = {
    ..._omit(data, ["ekycData", "merchantName", "terminalName", "ekycData"]),
    requestId,
    channel: CHANNEL_HDBS as string,
    ekyType: "CURRENT_CUSTOMER",
    userId,
    clientNo,
    transactionTime,
    partnerId: PARTNER_ID as string,
    language,
    accountType: "accountType",
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
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: ConfirmEKYCRequest = {
    requestId,
    channel: CHANNEL_HDBS as string,
    userId,
    clientNo,
    transactionTime,
    accountOtp: data.accountOtp || "123456",
    partnerId: PARTNER_ID as string,
    isTranInternet: data.isTranInternet,
    isUttb: data.isUttb,
    isBond: data.isBond,
    language,
    checksum: generateCheckSum({
      userId,
      clientNo,
      accountOtp: data.accountOtp || "123456",
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
      clientNo: "00013695",
    },
  };
  const resp: AxiosResponse<ListAccountResponse> = await axios.post(
    "/api/getAccountByCif",
    body
  );
  return resp;
};

export const createOTPApi = async (userId: string) => {
  const { requestId } = generateCommonBodyRequest();
  const body: CreateOTPRequest = {
    requestId,
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
