import { ResponseData } from "interfaces/ICommon";
import { NextRouter } from "next/router";

export const ERROR_CODE = {
  Success: "00",
  Unauthorized: "01",
  SessionExpired: "02",
  UserNotExist: "03",
  SessionIdNotFound: "04",
  FormatMessageInvalid: "05",
  PasswordExpired: "06",
  SystemError: "99",

  VerifyClientFailed: '100'
};

export function handleErrorWithResponse(
  router: NextRouter,
  resp: ResponseData
) {
  if (resp.response.responseCode === ERROR_CODE.Success) {
    return;
  }

  router.push({
    pathname: "/error",
    query: {
      code: ERROR_CODE.VerifyClientFailed,
    },
  });
}
