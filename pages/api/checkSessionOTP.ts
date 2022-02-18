import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";
import { CheckSessionOTPResponse } from "interfaces/ICheckSessionOTP";
import { ERROR_CODE } from "commons/helpers/error";
import crypto from "crypto";

const privateKey =
  "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAINjUPNuqhq8/xRU9gBEenL7M+VoWIF1/eKavmbhF1scLAy556+T42hZXZ2ov8sGeTyhYypaSAwOdOV5d7+O+PrNAS64KgFUOJmriTQldsd1OZeDT98ft31gPQGxKSlIkfwD1EFKeO8jMos0dcpNTLEbVAggptTaWFUAH+MrZS13AgMBAAECgYA8QxI/BRP6PZNVVP6b8syi7jrITsrBXkf7ZnRMJZOb01kU4TO14UPdeZepl1uYmDiFKZSdOVlwRjUxhzv4XXAulv3BNS5/CJfpWOj6ad5dfClws10tkXFWwp6zLWic9eXJQF+UGHYMy1edzbRpbNq1L8lrvAUz+UPn3u67PgjIAQJBAM210DyfBhwUfYXEmodOxQgeoH07r2m8EW7DlIHxjHZ+h0Y4rntrAdLv7rnawvm1fXWBsI29cLcUk4bpxBFHkXcCQQCjghyqvowjANw9mDenIEpaT1N5EiA9TYubt4f6CG+iwpBxmUDCe5E8xVBjl4kkfid0z+KG1fB4VE+S9d7y1kQBAkAA0B4hjzNT+xS/6ZX+wOXwcUaLGChKT6719BnrJYw7j6ZzNZgi7rpUHhSgcWfh2sDDLR8IgF4oqxEmMFhRBSpjAkBSaVoZlUD8w4o+YWJrkhLnwePIuiIVw+gB7FdU5rudxYMYPq4tWCqz/p+uEsrE4fDxJ3Z9j4dMnvIcmGBu9SABAkAQchKExzfalMJlMXzLn86I8xbAwZLIve+X+XXiMPxswDJ6R/CvtLoxczRBdB2d2u5e+IDzLGXM6haGd9pZ2uvt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckSessionOTPResponse>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/sbhService/v1/account/checkSessionOtp`;
    // const signature = crypto.sign("SHA256", Buffer.from("text"), privateKey);
    // console.log("signature----", signature);
    const resp: AxiosResponse<any> = await axiosWrapper.post(url, req.body, {
      headers: {
        "X-IBM-Client-Id": process.env.CLIENT_ID_SBH_OTP,
        "X-IBM-CLIENT-SECRET": process.env.CLIENT_SECRET_SBH_OTP,
      },
    });
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(
      ip.address(),
      new Date(),
      `check session otp: ${_get(e, "message")}`
    );
    res.status(200).json({
      response: {
        responseId: "",
        status: "",
        responseCode: ERROR_CODE.SystemError,
        responseMessage: "",
        responseTime: "",
        signature: "",
      },
    });
  }
}
