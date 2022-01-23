import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";
import _get from "lodash/get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InquiryEKYCPresentResponse>
) {
  const token = _get(req, "headers.authorization");
  const url = `${API_DOMAIN}/getMerchant`;

  const resp: AxiosResponse<InquiryEKYCPresentResponse> =
    await axiosWrapper.post(url, req.body, {
      headers: {
        Authorization: token,
      },
    });
  res.status(200).json(resp.data);
}
