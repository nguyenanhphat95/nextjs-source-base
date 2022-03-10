import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { GetNumberFailResponse } from "interfaces/LockUser/IGetNumberFail";
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
    const url = `${process.env.API_DOMAIN_SBH_LOCK_USER}/get?${qs.stringify(
      req.body
    )}`;
    const resp: AxiosResponse<GetNumberFailResponse> = await axiosWrapper.get(
      url
    );
    res.status(200).json(resp.data);
  } catch (err) {
    writeLog(
      ip.address(),
      new Date(),
      `Get number login fail api: ${_get(err, "message")}`
    );
  }
}
