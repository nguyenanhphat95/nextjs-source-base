import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import {
  GetQueryClientParams,
  HttpClientOptions,
  RequestConfigs,
} from "./types";
import { applyInterceptors } from "./utils";
const https = require("https");

interface HttpClientAdaptor {
  get<T>(url: string, configs?: Omit<RequestConfigs, "data">): Promise<T>;
  post<T, K>(url: string, body: K, configs?: RequestConfigs): Promise<T>;
  put<T, K>(url: string, body: K, configs?: RequestConfigs): Promise<T>;
  delete<T>(url: string, configs?: RequestConfigs): Promise<T>;
}

export class HttpClient {
  private readonly client: HttpClientAdaptor;
  constructor(client: HttpClientAdaptor) {
    this.client = client;

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  get<T>(url: string, configs?: Omit<RequestConfigs, "body">): Promise<T> {
    return this.client.get<T>(url, configs);
  }

  post<T, K>(url: string, body: K, configs?: RequestConfigs): Promise<T> {
    return this.client.post<T, K>(url, body, configs);
  }

  put<T, K>(url: string, body: K, configs?: RequestConfigs): Promise<T> {
    return this.client.put<T, K>(url, body, configs);
  }

  delete<T>(url: string, configs?: RequestConfigs): Promise<T> {
    return this.client.delete<T>(url, configs);
  }
}

const defaultConfigs: GetQueryClientParams = {
  paramsSerializer: (params) => queryString.stringify(params),
};

function createHttpClient(
  configs: GetQueryClientParams,
  options?: HttpClientOptions
) {
  const ins = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    ...defaultConfigs,
    ...configs,
  });

  if (!options) {
    return ins;
  }

  if (options.interceptors) {
    applyInterceptors(ins, options.interceptors);
  }

  return ins;
}

export default createHttpClient;
