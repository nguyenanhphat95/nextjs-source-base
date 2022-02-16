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
import crypto from "crypto";
import _getTime from "date-fns/getTime";

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDY1DzbqoavP8UVPYARHpy+zPlaFiBdf3imr5m4RdbHCwMueevk+NoWV2dqL/LBnk8oWMqWkgMDnTleXe/jvj6zQEuuCoBVDiZq4k0JXbHdTmXg0/fH7d9YD0BsSkpSJH8A9RBSnjvIzKLNHXKTUyxG1QIIKbU2lhVAB/jK2UtdwIDAQAB";
const secret = "123456789";
const generateBodyRequest = (object: Record<string, string>) => {
  return {
    request: {
      requestId: uuidv4(),
      partnerId: PARTNER_ID_SBH_OTP,
      // requestTime: "31122018231628",
      requestTime: getTodayWithFormat("ddMMyyyyhhmmss"),
      // signature:
      //   "AB46DM+9eshvFRRSQqL421E1Z3dfUAar0W/79ZHYju3Ajvnmex74O52lTFdG4k7EuJsR7d2ey6OsKhGv5U5gT6mw7HAg/FxE1GokSD/z2jt0Fd39S5TgrK20sbfvfZOfNLJERuZo5kX6ohW4LyTHHZ5wdmYVKSLp754Jvm+3RpQ=",
      signature: generateSignature(object),
      // signature:
      //   "EfbULVfBr4u6q2BITpcm+dichVttkDotTgK7xCKUXsH47lGXSbIe5Kr5ZZ+IKrySTt+nhoQG0OT6BQgu21RgwjKfdEiI6gLOV1h2sAfPeggD0ZkORLOxBaseUV2t6l7vMPzPHHH+Rfj+c9lnnBF52mhAK7o4MFZua8Zpqj7ZNL4=",
    },
  };
};

function generateSignature(object: Record<string, string>): string {
  let str = "";
  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  str += secret;
  const sh256 = crypto.createHash("sha256").update(str).digest("hex");
  return sh256;
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
