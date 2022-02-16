import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";
import { ERROR_CODE } from "commons/helpers/error";
import { PurchaseSbhResponse } from "interfaces/IPurchaseSBH";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PurchaseSbhResponse>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/sbhService/v1/account/purchaseSbh`;
    const resp: AxiosResponse<any> = await axiosWrapper.post(url, req.body, {
      headers: {
        "X-IBM-Client-Id": process.env.CLIENT_ID_SBH_OTP,
        "X-IBM-CLIENT-SECRET": process.env.CLIENT_SECRET_SBH_OTP,
      },
    });
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(ip.address(), new Date(), `purseChase sbh: ${_get(e, "message")}`);
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
