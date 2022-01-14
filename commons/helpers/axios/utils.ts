import { AxiosInstance } from "axios";

import { Interceptor } from "./types";

export function applyInterceptors(
  ins: AxiosInstance,
  interceptors: Interceptor[]
) {
  interceptors.forEach((interceptor) => {
    interceptor(ins);
  });
}
