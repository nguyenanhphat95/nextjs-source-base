import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { ConfirmEKYCResponse } from "interfaces/IConfirmEKYCPresent";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfirmEKYCResponse>
) {
  const token = _get(req, "headers.authorization");
  const url = `${API_DOMAIN}/api/hdbs/confirmEkycPresent`;
  const resp: AxiosResponse<ConfirmEKYCResponse> = await axiosWrapper.post(
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
