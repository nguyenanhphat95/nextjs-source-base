import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { writeLog } from "commons/helpers/logger";
import * as qs from "query-string";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const url = `${process.env.API_DOMAIN_LEAD_STATUS}/v4/api/hdb-ts-card/status/update`;
    console.log("request-url-call-update-lead-status:", url);
    console.log("request-call-update-lead-status:", req.body);
    const resp: AxiosResponse<any> = await axiosWrapper.post(url, req.body);
    console.log("resp-call-update-lead-status:", req.body);
    res.status(200).json(resp.data);
  } catch (err) {
    writeLog(
      ip.address(),
      new Date(),
      `Update Lead Status fail api: ${_get(err, "message")}`
    );
  }
}
