import axios, { AxiosResponse } from "axios";
import { PublicKeyResponse } from "interfaces/IPublicKey";

export const getPublicKey = async () => {
  const resp: AxiosResponse<PublicKeyResponse> = await axios.get(
    "/sso-changePassword/api/getPublicKey"
  );
  return resp;
};
