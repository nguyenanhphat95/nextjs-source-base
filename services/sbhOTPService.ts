import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import { PARTNER_ID_SBH_OTP } from "commons/constants";
import { getTodayWithFormat } from "commons/helpers/date";
import {
  CheckSessionOTPRequest,
  CheckSessionOTPResponse,
} from "interfaces/ICheckSessionOTP";
import {
  GetInfoByTokenRequest,
  GetInfoByTokenResponse,
} from "interfaces/IGetInfoByToken";
import { SbhPurchaseInfo } from "interfaces/ISbhOTP";
import {
  VerifySbhOTPRequest,
  VerifySbhOTPResponse,
} from "interfaces/IVerifySbhOTP";
import { PurchaseSbhResponse } from "interfaces/IPurchaseSBH";
import _getTime from "date-fns/getTime";

const generateBodyRequest = (object?: Record<string, string>) => {
  return {
    request: {
      requestId: uuidv4(),
      partnerId: PARTNER_ID_SBH_OTP,
      requestTime: getTodayWithFormat("ddMMyyyyhhmmss"),
      signature: "signature",
      // signature: generateStrSignature(object),
    },
  };
};
// function generateStrSignature(object: Record<string, string>): string {
//   let str = "";
//   const keys = Object.keys(object);
//   keys.forEach((key) => {
//     str += object[key];
//   });
//   str += "123456789";
//   return str;
// }

export const checkSessionOTPApi = async (uuid: string) => {
  const body: CheckSessionOTPRequest = {
    uuid,
  };
  const resp: AxiosResponse<CheckSessionOTPResponse> = await axios.post(
    "/api/checkSessionOTP",
    {
      ...generateBodyRequest({ partnerId: PARTNER_ID_SBH_OTP || "", uuid }),
      data: body,
    }
  );
  return resp.data;
};

export const getInfoByTokenApi = async (bTxnId: string) => {
  const body: GetInfoByTokenRequest = {
    bTxnId,
  };
  const resp: AxiosResponse<GetInfoByTokenResponse> = await axios.post(
    "/api/getInfoByToken",
    {
      ...generateBodyRequest(),
      data: body,
    }
  );
  return resp.data;
};

export const purchaseSbhApi = async (body: SbhPurchaseInfo) => {
  const resp: AxiosResponse<PurchaseSbhResponse> = await axios.post(
    "/api/purchaseSbh",
    {
      ...generateBodyRequest(),
      data: {
        ...body,
        txnId: uuidv4(),
        tokenizeId: "08c18d1e-3901-4b0e-a49c-7970efa179bd",
      },
    }
  );
  return resp.data;
};

export const verifySbhOTPApi = async (otp: string, bTxnId: string) => {
  const body: VerifySbhOTPRequest = {
    otp,
    bTxnId,
  };
  const resp: AxiosResponse<VerifySbhOTPResponse> = await axios.post(
    "/api/verifySbhOTP",
    {
      ...generateBodyRequest(),
      data: body,
    }
  );
  return resp.data;
};
