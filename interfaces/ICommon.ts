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
