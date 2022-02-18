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

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDY1DzbqoavP8UVPYARHpy+zPlaFiBdf3imr5m4RdbHCwMueevk+NoWV2dqL/LBnk8oWMqWkgMDnTleXe/jvj6zQEuuCoBVDiZq4k0JXbHdTmXg0/fH7d9YD0BsSkpSJH8A9RBSnjvIzKLNHXKTUyxG1QIIKbU2lhVAB/jK2UtdwIDAQAB";
const secret = "123456789";
const privateKey =
  "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAINjUPNuqhq8/xRU9gBEenL7M+VoWIF1/eKavmbhF1scLAy556+T42hZXZ2ov8sGeTyhYypaSAwOdOV5d7+O+PrNAS64KgFUOJmriTQldsd1OZeDT98ft31gPQGxKSlIkfwD1EFKeO8jMos0dcpNTLEbVAggptTaWFUAH+MrZS13AgMBAAECgYA8QxI/BRP6PZNVVP6b8syi7jrITsrBXkf7ZnRMJZOb01kU4TO14UPdeZepl1uYmDiFKZSdOVlwRjUxhzv4XXAulv3BNS5/CJfpWOj6ad5dfClws10tkXFWwp6zLWic9eXJQF+UGHYMy1edzbRpbNq1L8lrvAUz+UPn3u67PgjIAQJBAM210DyfBhwUfYXEmodOxQgeoH07r2m8EW7DlIHxjHZ+h0Y4rntrAdLv7rnawvm1fXWBsI29cLcUk4bpxBFHkXcCQQCjghyqvowjANw9mDenIEpaT1N5EiA9TYubt4f6CG+iwpBxmUDCe5E8xVBjl4kkfid0z+KG1fB4VE+S9d7y1kQBAkAA0B4hjzNT+xS/6ZX+wOXwcUaLGChKT6719BnrJYw7j6ZzNZgi7rpUHhSgcWfh2sDDLR8IgF4oqxEmMFhRBSpjAkBSaVoZlUD8w4o+YWJrkhLnwePIuiIVw+gB7FdU5rudxYMYPq4tWCqz/p+uEsrE4fDxJ3Z9j4dMnvIcmGBu9SABAkAQchKExzfalMJlMXzLn86I8xbAwZLIve+X+XXiMPxswDJ6R/CvtLoxczRBdB2d2u5e+IDzLGXM6haGd9pZ2uvt";
const generateBodyRequest = (object: Record<string, string>) => {
  return {
    request: {
      requestId: uuidv4(),
      partnerId: PARTNER_ID_SBH_OTP,
      requestTime: getTodayWithFormat("ddMMyyyyhhmmss"),
      signature: generateStrSignature(object),
      // signature:
      //   "EfbULVfBr4u6q2BITpcm+dichVttkDotTgK7xCKUXsH47lGXSbIe5Kr5ZZ+IKrySTt+nhoQG0OT6BQgu21RgwjKfdEiI6gLOV1h2sAfPeggD0ZkORLOxBaseUV2t6l7vMPzPHHH+Rfj+c9lnnBF52mhAK7o4MFZua8Zpqj7ZNL4=",
    },
  };
};

function generateStrSignature(object: Record<string, string>): string {
  let str = "";
  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  str += secret;
  return str;
}

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

// export const getInfoByTokenApi = async (token: string) => {
//   const body: GetInfoByTokenRequest = {
//     bTxnId: token,
//   };
//   const resp: AxiosResponse<GetInfoByTokenResponse> = await axios.post(
//     "/api/getInfoByToken",
//     {
//       ...generateBodyRequest(),
//       data: body,
//     }
//   );
//   return resp.data;
// };

// export const purchaseSbhApi = async (body: SbhPurchaseInfo) => {
//   const resp: AxiosResponse<PurchaseSbhResponse> = await axios.post(
//     "/api/purchaseSbh",
//     {
//       ...generateBodyRequest(),
//       data: { ...body, txnId: uuidv4() },
//     }
//   );
//   return resp.data;
// };

// export const verifySbhOTPApi = async (otp: string, bTxnId: string) => {
//   const body: VerifySbhOTPRequest = {
//     otp,
//     bTxnId,
//   };
//   const resp: AxiosResponse<VerifySbhOTPResponse> = await axios.post(
//     "/api/verifySbhOTP",
//     {
//       ...generateBodyRequest(),
//       data: body,
//     }
//   );
//   return resp.data;
// };
