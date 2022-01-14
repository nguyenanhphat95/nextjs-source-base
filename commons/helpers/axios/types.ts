import { AxiosRequestConfig } from "axios";

export type RequestTransformer = () => any;
export type ResponseTransformer = () => any;

export interface RequestConfigs {
  data?: any;
  transformRequest?: RequestTransformer | RequestTransformer[];
  transformResponse?: ResponseTransformer | ResponseTransformer[];
  headers?: Record<string, any>;
  params?: any;
  paramsSerializer?: (params: any) => string;
  timeout?: number;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
}

export type Interceptor = (...args: any[]) => any;

export type GetQueryClientParams = Partial<AxiosRequestConfig>;

export interface HttpClientOptions {
  interceptors?: Interceptor[];
}
