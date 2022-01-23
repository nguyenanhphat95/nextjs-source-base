import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { GetMerchantResponse } from "interfaces/IGetMerchant";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetMerchantResponse>
) {
  const token = _get(req, "headers.authorization");
  const url = `${API_DOMAIN}/api/hdbs/getMerchant`;
  const resp: AxiosResponse<GetMerchantResponse> = await axiosWrapper.post(
    url,
    req.body,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  res.status(200).json(resp.data);
}
