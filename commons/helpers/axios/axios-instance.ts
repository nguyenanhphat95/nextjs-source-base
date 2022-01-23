import createHttpClient, { HttpClient } from "./http-client";

const httpClient = createHttpClient(
  {
    timeout: 150000,
  },
  {
    interceptors: [],
  }
);

const axiosWrapper = new HttpClient(httpClient);

export default axiosWrapper;
