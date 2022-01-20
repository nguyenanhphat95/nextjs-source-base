export interface ResponseData {
  response: {
    responseId: string;
    responseCode: string;
    responseMessage: string;
    responseTime: string;
  };
}

export interface LogData {
  content: string;
  body?: Record<string, string>;
}

export type Gender = "M" | "F";
export type EkycType = "NEW_CUSTOMER" | "CURRENT_CUSTOMER";
