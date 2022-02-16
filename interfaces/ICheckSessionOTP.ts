import { ResponseData } from "./ICommon";

export interface CheckSessionOTPRequest {
  uuid: string;
}

export interface CheckSessionOTPResponse extends ResponseData {
  data?: {
    message?: string;
    code?: string;
  };
}
