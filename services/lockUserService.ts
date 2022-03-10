import axios, { AxiosResponse } from "axios";
import { getTodayWithFormat } from "commons/helpers/date";
import { GetNumberFailResponse } from "interfaces/LockUser/IGetNumberFail";
import {
  STATUS_ID,
  UpdateLeadStatusRequest,
} from "interfaces/LockUser/IUpdateLeadStatus";
import { UpdateNumberFailRequest } from "interfaces/LockUser/IUpdateNumberFail";
import { v4 as uuidv4 } from "uuid";

export const getNumberFailApi = async (key: string) => {
  const resp: AxiosResponse<GetNumberFailResponse> = await axios.post(
    "/sso/api/LockUser/getNumberFail",
    {
      key,
    }
  );
  return resp.data;
};

export const updateNumberFailApi = async (data: UpdateNumberFailRequest) => {
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/updateNumberFail",
    data
  );
  return resp;
};

function generateStrSignature(object: Record<string, string>): string {
  let str = "";
  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  str += "13572469";
  return str;
}

export const updateLeadStatus = async (
  leadId: string,
  campaignId: string,
  statusId: STATUS_ID
) => {
  let body: UpdateLeadStatusRequest = {
    requestId: uuidv4(),
    requestTime: getTodayWithFormat("ddMMyyyyhhmmss"),
    signature: "",
    leadId,
    campaignId,
    statusId,
  };
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/LockUser/updateLeadStatus",
    {
      ...body,
      signature: generateStrSignature({
        requestId: body.requestId,
        requestTime: body.requestTime,
        campaignId: body.campaignId,
        leadId: body.leadId,
      }),
    }
  );
  return resp.data;
};
