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
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";
import {
  ConfirmEKYCRequest,
  ConfirmEKYCResponse,
} from "interfaces/IConfirmEKYCPresent";
import {
  UpdateTokenKeyPartnerRequest,
  UpdateTokenKeyPartnerResponse,
} from "interfaces/IUpdateTokenKeyPartner";

import {
  GetAccessTokenRequest,
  GetAccessTokenResponse,
} from "interfaces/IGetAccessToken";

import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import { MasterData } from "components/HDBSPage/interfaces";

const partnerId = "hdbs";
const channel = "mbank";
let userId: string = "0915423641";
let clientNo: string = "00012132";
let language: string = "VI";
let accessToken: string = "";

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
    transactionTime: "18/01/2022 16:00:00",
  };
}

function generateCheckSum(object: Record<string, string>) {
  let str = "";
  const md5 = _get(window, "md5");

  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  return md5(str);
}

export const getAccessToken = async () => {
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: GetAccessTokenRequest = {
    requestId,
    language,
    transactionTime,
    userName: "userName",
    password: "password",
    checksum: generateCheckSum({
      userName: "userName",
      password: "password",
      transactionTime,
    }),
  };
  const resp: AxiosResponse<GetAccessTokenResponse> = await axios.post(
    "/api/getAccessToken",
    body
  );
  return resp.data;
};

export const getMerchant = async () => {
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: GetMerchantRequest = {
    requestId,
    language,
    channel,
    transactionTime,
    partnerId,
    checksum: generateCheckSum({
      partnerId,
      transactionTime,
    }),
  };

  const resp: AxiosResponse<GetMerchantResponse> = await axios.post(
    "/api/getMerchant",
    body
  );
  return resp.data;
};

export const checkUserEKYC = async (merchantId: string, terminalId: string) => {
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: CheckUserENCYRequest = {
    requestId,
    language,
    transactionTime,
    channel,
    clientNo,
    merchantId,
    terminalId,
    userId,
    partnerId,
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      merchantId,
      terminalId,
      partnerId,
    }),
  };
  const resp: AxiosResponse<CheckUserEKYCResponse> = await axios.post(
    "/api/checkUserEKYC",
    body
  );
  return resp.data;
};

export const inquiryEKYCPresent = async () => {
  const body: any = {};
  const resp: AxiosResponse<InquiryEKYCPresentResponse> = await axios.post(
    "/api/inquiryEKYCPresent",
    body
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

export const confirmEKYCPresent = async (otp: string) => {
  const body: ConfirmEKYCRequest = {
    requestId: uuidv4() as string,
    accountOtp: otp,
    partnerId,
  };
  const resp: AxiosResponse<ConfirmEKYCResponse> = await axios.post(
    "/api/confirmEKYCPresent",
    body
  );
  return resp.data;
};

export const updateTokenKeyPartner = async () => {
  const body: UpdateTokenKeyPartnerRequest = {
    userId,
    clientNo,
    token: "token",
    partnerId,
  };
  const resp: AxiosResponse<UpdateTokenKeyPartnerResponse> = await axios.post(
    "/api/updateTokenKeyPartner",
    body
  );
  return resp.data;
};
