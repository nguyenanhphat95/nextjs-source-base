import axios, { AxiosResponse } from "axios";
import {
  ListAccountResponse,
  ListAccountRequest,
  AccountItem,
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
import {
  addMinuteFromNow,
  getTodayWithFormat,
  getValidStringDate,
} from "commons/helpers/date";
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
import { RatingRequest, RatingResponse } from "interfaces/IRating";
import { EkycType } from "interfaces/ICommon";

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

export function filterListAccount(data: AccountItem[]): AccountItem[] {
  if (data && data.length) {
    return data.filter((item) => {
      if (
        (item.AcctType === "712" ||
          item.AcctType === "700" ||
          item.AcctType === "7OL" ||
          item.AcctType === "70M" ||
          item.AcctType === "70G" ||
          item.AcctType === "797" ||
          item.AcctType === "7PL" ||
          item.AcctType === "7ZR" ||
          item.AcctType === "7PR") &&
        (item.acctStatus === "A" || item.acctStatus === "N") &&
        item.clientInd !== "S"
      ) {
        return item;
      }
    });
  }
  return [];
}

export function convertInfoUserFromCore(data: InquiryEKYCPresentResponse) {
  return {
    fullNameOcr: data?.fullName,
    idNumber: data?.identityId,
    gender: data?.gender,
    birthDateOcr: getValidStringDate(data?.birthDate),
    dateOfIssueOcr: getValidStringDate(data?.idDate as string),
    placeOfIssueOcr: data?.idPlace,
    address: data?.address,
    address2: data?.address2,
    nationalityName: data?.national,
    phoneNumber: data?.phoneNumber,
    idNumberType: data?.identityIdType,
    email: data?.email,
  };
}

function updateTokenExpired(expireIn: number) {
  tokenExpired = addMinuteFromNow(expireIn / 60 - 5, "MM/dd/yyyy H:mm:ss");
}

function generateCommonBodyRequest() {
  return {
    requestId: uuidv4() as string,
    language,
    // transactionTime: "15/02/2022 17:25:34",
    transactionTime: getTodayWithFormat(),
  };
}

const refreshAccessToken = async () => {
  const today = new Date();
  const timeToday = today.getTime();

  if (!tokenExpired) {
    return await getAccessToken();
  }

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
    userId,
    clientNo,
    requestId,
    language,
    channel: CHANNEL_HDBS as string,
    transactionTime,
    partnerId: PARTNER_ID as string,
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      partnerId: PARTNER_ID as string,
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

export const checkUserEKYC = async (
  merchantId: string,
  terminalId: string,
  ekycType: EkycType,
  accountNo: string
) => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: CheckUserENCYRequest = {
    requestId,
    language,
    transactionTime,
    ekycType,
    channel: CHANNEL_HDBS as string,
    clientNo,
    merchantId,
    terminalId,
    userId,
    partnerId: PARTNER_ID as string,
    accountNo,
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
      "isBond",
      "isTranInternet",
      "isUttb",
      "imgBackKey",
      "imgFrontKey",
      "imgFaceKey",
    ]),
    ekycType: data.ekycType ? data.ekycType : "CURRENT_CUSTOMER",
    requestId,
    channel: CHANNEL_HDBS as string,
    userId,
    clientNo,
    transactionTime,
    partnerId: PARTNER_ID as string,
    language,
    faceMatching: "Y",
    dateOfIssue: getValidStringDate(data?.dateOfIssue || ""),
    dateOfIssueOcr: getValidStringDate(data?.dateOfIssueOcr || ""),
    expireOfIssue: getValidStringDate(data?.expireOfIssue || ""),
    expireOfIssueOcr: getValidStringDate(data?.expireOfIssueOcr || ""),
    birthDateOcr: getValidStringDate(data?.birthDateOcr || ""),
    birthDate: getValidStringDate(data?.birthDate || ""),
    files: [
      {
        fileValue: data?.imgBackKey || "",
        fileName: "img_back.jpg",
        fileId: "img_back",
      },
      {
        fileValue: data?.imgFrontKey || "",
        fileName: "img_front.jpg",
        fileId: "img_front",
      },
      {
        fileValue: data?.imgFaceKey || "",
        fileName: "img_face.jpg",
        fileId: "img_face",
      },
    ],
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
  console.log('timeout client: ', resp);

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

export const createRatingApi = async (
  ratingNumber: number,
  ratingNote: string
) => {
  await refreshAccessToken();
  const { requestId, language, transactionTime } = generateCommonBodyRequest();
  const body: RatingRequest = {
    requestId,
    channel: CHANNEL_HDBS as string,
    partnerId: PARTNER_ID as string,
    language,
    transactionTime,
    userId,
    clientNo,
    ratingNumber,
    ratingNote,
    ratingInfo: "success",
    ratingType: "RATING_TRANS_SUCCESS",
    ratingTypeName: "đánh giá giao dịch",
    ratingProductGroup: "TRANSFER",
    ratingProductCode: "T06",
    ratingProduct: "liên kết tkck",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    checksum: generateCheckSum({
      userId,
      clientNo,
      transactionTime,
      partnerId: PARTNER_ID as string,
    }),
  };
  const resp: AxiosResponse<RatingResponse> = await axios.post(
    "/api/createRating",
    body,
    {
      headers: {
        Authorization: Cookies.get(KEY_TOKEN) || "",
      },
    }
  );
  return resp;
};
