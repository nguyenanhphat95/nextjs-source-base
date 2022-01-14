// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axiosWrapper from "commons/helpers/axios/axios-instance";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { ResponseData } from "interfaces/ICommon";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";
export interface VerifyUserResponse extends ResponseData {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyUserResponse>
) {
  const url = `${API_DOMAIN}/oauth2/api/verify_client`;
  try {
    const resp: AxiosResponse<VerifyUserResponse> = await axiosWrapper.post(
      url,
      {
        ...req.body,
        clientSecret: process.env.CLIENT_SECRET,
      }
    );
    res.status(200).json(resp.data);
  } catch (e) {
    writeLog(
      ip.address(),
      new Date(),
      `Verify user api: ${_get(e, "message")}`,
      JSON.stringify(req.body)
    );
  }
}
