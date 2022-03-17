export interface ResponseData {
  response: {
    responseId: string;
    status?: string;
    responseCode: string;
    responseMessage: string;
    responseTime: string;
    signature?: string;
  };
}

export interface LogData {
  content: string;
  body?: Record<any, any>;
}
