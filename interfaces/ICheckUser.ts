import { ResponseData } from "./ICommon";

export interface CheckUserRequest {
  requestId: string;
  data: {
    userId: string;
    globalId: string;
  };
}

export interface CheckUserResponse extends ResponseData {
  data?: {
    status: string;
  };
}
