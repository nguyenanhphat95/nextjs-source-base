import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

export const getLoginFailApi = async () => {
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/getLoginFail"
  );
  return resp;
};
