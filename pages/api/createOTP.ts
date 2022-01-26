import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { getTodayWithFormat } from "commons/helpers/date";
import { AxiosResponse } from "axios";
import { CreateOTPResponse } from "interfaces/ICreateOTP";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateOTPResponse>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/oauthservice/createOtp`;
    const resp: AxiosResponse<CreateOTPResponse> = await axiosWrapper.post(
      url,
      req.body,
      {
        headers: {
          "X-IBM-Client-Id": process.env.CLIENT_ID_SBH,
          "X-IBM-CLIENT-SECRET": process.env.CLIENT_SECRET_SBH,
        },
      }
    );
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(
      ip.address(),
      getTodayWithFormat(),
      `createOtp: ${_get(e, "message")}`
    );
  }
}
