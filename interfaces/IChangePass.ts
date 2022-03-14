export interface ChangepassRequest {
  request: {
    requestId: string;
    requestTime: string;
  };

  data: {
    credential: string;
    key: string;
  };
}

//   export interface ChangePassResponse {
//     data: {
//       returnOTP: string;
//       mediaType: string;
//       userId: string;
//       narrative: string;
//     };
//   }
