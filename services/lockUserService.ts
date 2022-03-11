import axios, { AxiosResponse } from "axios";
import { getTodayWithFormat } from "commons/helpers/date";
import { GetNumberFailResponse } from "interfaces/LockUser/IGetNumberFail";
import {
  STATUS_ID,
  UpdateLeadStatusRequest,
} from "interfaces/LockUser/IUpdateLeadStatus";
import { UpdateNumberFailRequest } from "interfaces/LockUser/IUpdateNumberFail";
import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";

export const generateRequestBody = () => {
  return {
    request: {
      requestId: uuidv4(),
      requestTime: getTodayWithFormat("ddMMyyyyhhmmss"),
    },
  };
};

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
    {
      ...generateRequestBody(),
      data,
    }
  );
  return resp;
};

function generateStrSignature(object: Record<string, string>): string {
  const md5 = _get(window, "md5");
  let str = "13572469";
  const keys = Object.keys(object);
  keys.forEach((key) => {
    str += object[key];
  });
  return md5(str);
}

export const updateLeadStatus = async (
  leadId: string,
  campaignId: string,
  statusId: STATUS_ID,
  eBanking: string
) => {
  let body: UpdateLeadStatusRequest = {
    requestId: uuidv4(),
    requestTime: getTodayWithFormat("dd/MM/yyyy hh:mm:ss"),
    signature: "",
    leadId,
    campaignId,
    statusId,
    eBanking,
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
