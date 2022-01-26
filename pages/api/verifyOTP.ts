import type { NextApiRequest, NextApiResponse } from "next";
import { getTodayWithFormat } from "commons/helpers/date";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { VerifyOTPResponse } from "interfaces/IVerifyOTP";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyOTPResponse>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/oauthservice/verifyOtp`;
    const resp: AxiosResponse<VerifyOTPResponse> = await axiosWrapper.post(
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
  } catch (err) {
    writeLog(
      ip.address(),
      getTodayWithFormat(),
      `Verify OTP api: ${_get(err, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
