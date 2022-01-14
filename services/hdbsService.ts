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
    partnetId: "hdbs",
  };

  const resp: AxiosResponse<GetMerchantResponse> = await axios.post(
    "/api/getMerchant",
    body
  );
  return resp.data;
};

export const checkUserEKYC = async () => {
  const body: CheckUserENCYRequest = {
    userId: "userId",
    clientNo: "clientNo",
    partnetId: "hdbs",
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
