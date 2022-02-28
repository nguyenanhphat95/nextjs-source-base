import axios, { AxiosResponse } from "axios";
import { GetAccessTokenResponse } from "pages/api/getAccessToken";
import _get from "lodash/get";

export interface GetAccessTokenBody {
  code: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  redirect_uri: string;
}

export const getAccessTokenApi = async (body: GetAccessTokenBody) => {
  const resp: AxiosResponse<GetAccessTokenResponse> = await axios.post(
    "/api/getAccessToken",
    body
  );
  return resp;
};
