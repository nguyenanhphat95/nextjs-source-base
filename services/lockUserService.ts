import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

export const getNumberLoginFailApi = async (nationID: string) => {
  const resp: AxiosResponse<any> = await axios.get(
    "18.142.163.82:22074/oauth2/api/login_fail/get?username=test"
  );
  console.log("resp--:", resp);
  return resp;
};

export const updateNumberLoginFailApi = async () => {
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/updateNumberLoginFail"
  );
  return resp;
};

export const getNumberOTPFailApi = async () => {
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/getNumberOTPFail"
  );
  return resp;
};

export const updateNumberOTPFailApi = async () => {
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/updateNumberOTPFail"
  );
  return resp;
};
