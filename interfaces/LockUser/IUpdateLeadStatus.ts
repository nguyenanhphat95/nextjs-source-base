import { ResponseData } from "interfaces/ICommon";
// import { UpdateNumberFailRequest } from "./IUpdateNumberFail";
export enum STATUS_ID {
  LOCK_LOGIN = "LOCKEB5",
  LOCK_VERIFY_OTP = "IEPAOTP5",
  LOCK_SEND_OTP = "REPAOTP5",
}
export interface UpdateLeadStatusRequest {
  requestId: string;
  requestTime: string;
  signature: string;
  leadId: string;
  campaignId: string;
  statusId: STATUS_ID;
}
// export interface UpdateLeadStatusResponse extends ResponseData {
//   data: UpdateNumberFailRequest;
// }
