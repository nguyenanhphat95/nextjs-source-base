import axiosWrapper from "commons/helpers/axios/axios-instance";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export interface VerifyResponse {
  data: {
    code: string;
  };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  const url = `${API_DOMAIN}/oauth2/api/verify`;
  try {
    const resp: AxiosResponse<VerifyResponse> = await axiosWrapper.post(
      url,
      req.body
    );
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(
      ip.address(),
      new Date(),
      `Verify api: ${_get(e, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
