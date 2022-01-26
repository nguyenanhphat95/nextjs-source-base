import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { getTodayWithFormat } from "commons/helpers/date";
import { AxiosResponse } from "axios";
import { ListAccountResponse } from "interfaces/IListAccount";
import { API_DOMAIN_SBH_SANDBOX } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListAccountResponse>
) {
  try {
    const url = `${API_DOMAIN_SBH_SANDBOX}/accounts/byCif`;
    const resp: AxiosResponse<ListAccountResponse> = await axiosWrapper.post(
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
      `Get list account api: ${_get(err, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
