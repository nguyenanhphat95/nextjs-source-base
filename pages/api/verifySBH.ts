import axiosWrapper from "commons/helpers/axios/axios-instance";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const url = `${API_DOMAIN}/oauth2/api/verify_sbh`;
    const resp: AxiosResponse<any> = await axiosWrapper.post(url, req.body);
    res.status(200).json(resp.data);
  } catch (err) {
    writeLog(
      ip.address(),
      new Date(),
      `Verify SBH api: ${_get(err, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
