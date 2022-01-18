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

import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import {
  ConfirmEKYCRequest,
  ConfirmEKYCResponse,
} from "interfaces/IConfirmEKYCPresent";
import {
  UpdateTokenKeyPartnerRequest,
  UpdateTokenKeyPartnerResponse,
} from "interfaces/IUpdateTokenKeyPartner";

const partnerId = "hdbs";
let userId: string = "0915423641";
let clientNo: string = "02887123";

export function updateMasterData(userId: string, clientNo: string) {
  userId = userId;
  clientNo = clientNo;
}

function generateBodyRequest<T>(key: string, body: T) {
  return {
    [key]: {
      header: {
        common: {
          serviceVersion: "1",
          messageId: "",
          transactionId: "",
          messageTimestamp: "",
        },
        client: {
          sourceAppID: "IB",
          targetAppIDs: ["ESB"],
          userDetail: {
            userID: "DTC",
            userPassword: "RFRDMTIz",
          },
        },
      },
      bodyReq: {
        functionCode: "HDB2C-INQUIRYEKYCPRESENT-JDBC-ECRM",
        data: body,
      },
    },
  };
}

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

export const getMerchant = async () => {
  const body: GetMerchantRequest = {
    partnerKey: "123",
    partnerId,
  };

  const resp: AxiosResponse<GetMerchantResponse> = await axios.post(
    "/api/getMerchant",
    body,
    generateBodyRequest("getMerchantReq", body)
  );
  return resp.data;
};

export const checkUserEKYC = async (merchantId: string, terminalId: string) => {
  const body: CheckUserENCYRequest = {
    userId,
    clientNo,
    merchantId,
    terminalId,
    partnerId,
  };
  const resp: AxiosResponse<CheckUserEKYCResponse> = await axios.post(
    "/api/checkUserEKYC",
    generateBodyRequest("checkUserEkycReq", body)
  );
  return resp.data;
};

export const inquiryEKYCPresent = async () => {
  const body: any = {};
  const resp: AxiosResponse<InquiryEKYCPresentResponse> = await axios.post(
    "/api/inquiryEKYCPresent",
    generateBodyRequest("inquiryEkycPresentReq", body)
  );
  return resp.data;
};

export const confirmEKYCPresent = async (otp: string) => {
  const body: ConfirmEKYCRequest = {
    requestId: uuidv4() as string,
    accountOtp: otp,
    partnerId,
  };
  const resp: AxiosResponse<ConfirmEKYCResponse> = await axios.post(
    "/api/confirmEKYCPresent",
    generateBodyRequest("confirmEKYCPresentReq", body)
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
    generateBodyRequest("updateTokenKeyPartnerReq", body)
  );
  return resp.data;
};
