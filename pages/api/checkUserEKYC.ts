import { getTodayWithFormat } from "commons/helpers/date";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { CheckUserEKYCResponse } from "interfaces/ICheckUserEKYS";
import { writeLog } from "commons/helpers/logger";
import _get from "lodash/get";
import ip from "ip";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckUserEKYCResponse>
) {
  try {
    const token = _get(req, "headers.authorization");
    const url = `${API_DOMAIN}/api/hdbs/checkUserEkyc`;
    const resp: AxiosResponse<CheckUserEKYCResponse> = await axiosWrapper.post(
      url,
      req.body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(
      ip.address(),
      getTodayWithFormat(),
      `checkUserEKYC: ${_get(e, "message")}`
    );
  }
}
