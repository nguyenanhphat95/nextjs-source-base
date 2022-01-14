import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import * as qs from "query-string";

export interface GetAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  session_state: string;
  scope: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAccessTokenResponse>
) {
  const url = `${API_DOMAIN}/oauth2/api/token`;
  const resp: AxiosResponse<GetAccessTokenResponse> = await axiosWrapper.post(
    url,
    qs.stringify(req.body),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  res.status(200).json(resp.data);
}
