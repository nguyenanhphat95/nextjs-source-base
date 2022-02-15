import type { NextApiRequest, NextApiResponse } from "next";
import { getTodayWithFormat } from "commons/helpers/date";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { writeLog } from "commons/helpers/logger";
import { RatingResponse } from "interfaces/IRating";
import _get from "lodash/get";
import ip from "ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RatingResponse>
) {
  try {
    const token = _get(req, "headers.authorization");
    const url = `${API_DOMAIN}/api/hdbs/submitRatingTrans`;
    const resp: AxiosResponse<RatingResponse> = await axiosWrapper.post(
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
      `inquiryEkycPresent: ${_get(e, "message")}`
    );
  }
}
