import { ResponseData } from "interfaces/ICommon";
import { UpdateNumberFailRequest } from "./IUpdateNumberFail";

export interface GetNumberFailResponse extends ResponseData {
  data: UpdateNumberFailRequest;
}
