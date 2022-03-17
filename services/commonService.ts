import { LogData } from "../interfaces/ICommon";
import axiosWrapper from "commons/helpers/axios/axios-instance";

export function writeLogApi(body: LogData) {
  axiosWrapper.post("/sso/api/writeLog", body);
}
