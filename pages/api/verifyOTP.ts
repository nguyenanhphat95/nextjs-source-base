import { ConfirmEKYCResponse } from './../../interfaces/IConfirmEKYCPresent';
import { API_DOMAIN } from './../../commons/constants/index';
import type { NextApiRequest, NextApiResponse } from "next";
import { getTodayWithFormat } from "commons/helpers/date";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
// import { VerifyOTPResponse } from "interfaces/IVerifyOTP";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/oauthservice/verifyOtp`;
    const resp: AxiosResponse<any> = await axiosWrapper.post(
      url,
      req.body.dataOtp,
      {
        headers: {
          "X-IBM-Client-Id": process.env.CLIENT_ID_SBH,
          "X-IBM-CLIENT-SECRET": process.env.CLIENT_SECRET_SBH,
        },
      }
    );
    
    if (_get(resp.data, "data.userId")) {
      // Tạo tài khoản chứng khoán
      try {
        const token = _get(req, "headers.authorization");
        const url = `${API_DOMAIN}/api/hdbs/confirmEkycPresent`;
        const respConfirm: AxiosResponse<ConfirmEKYCResponse> = await axiosWrapper.post(
          url,
          req.body.dataForm,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        res.status(200).json({ respConfirm: respConfirm.data});
      } catch (e) {
        writeLog(
          ip.address(),
          getTodayWithFormat(),
          `confirmEkycPresent: ${_get(e, "message")}`
        );
      }
      return
    }

    res.status(200).json({ respOtp: resp.data });
  } catch (err) {
    writeLog(
      ip.address(),
      getTodayWithFormat(),
      `Verify OTP api: ${_get(err, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
