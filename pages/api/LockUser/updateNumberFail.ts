import axiosWrapper from "commons/helpers/axios/axios-instance";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosResponse } from "axios";
import { writeLog } from "commons/helpers/logger";
import ip from "ip";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // try {
  const url = `${process.env.API_DOMAIN_SBH_LOCK_USER}/update`;
  console.log("api-update-number-login-----:", url);
  console.log("api-update-number-login-body----:", req.body);

  const resp: AxiosResponse<any> = await axiosWrapper.post(url, req.body);
  res.status(200).json(resp.data);
  // } catch (err) {
  //   writeLog(
  //     ip.address(),
  //     new Date(),
  //     `Update number fail api: ${_get(err, "message")}`
  //   );
  // }
}
