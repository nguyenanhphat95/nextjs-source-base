import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { GetAccessTokenResponse } from "interfaces/IGetAccessToken";

const MOCK_DATA = {
  resultCode: "00",
  resultMessage: "Successfully",
  accessToken: "Access token",
  expiryIn: 300,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAccessTokenResponse>
) {
  const url = `${API_DOMAIN}/api/hdbs/accessToken`;
  const resp: AxiosResponse<GetAccessTokenResponse> = await axiosWrapper.post(
    url,
    req.body
  );
  res.status(200).json(resp.data);
}
