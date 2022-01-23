import { AxiosRequestConfig, AxiosInstance } from "axios";
import _set from "lodash/set";
import * as Cookies from "commons/helpers/cookies";
import { KEY_TOKEN } from "commons/constants";

async function appendAuthHeader(config: AxiosRequestConfig) {
  _set(config, "config.headers.Authorization", Cookies.get(KEY_TOKEN));
}

export function injectRefreshTokenInterceptor(ins: AxiosInstance) {
  ins.interceptors.response.use(
    async (response) => {
      await appendAuthHeader(response.config);
      return ins(response.config);
    },
    (error) => {
      throw error;
    }
  );
}
