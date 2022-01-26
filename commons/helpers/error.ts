import { ResponseData } from "interfaces/ICommon";
import { NextRouter } from "next/router";
import _get from "lodash/get";
import { ERROR_CODE_WITH_MESSAGE } from "commons/constants";
export const ERROR_CODE = {
  Success: "00",
  Unauthorized: "01",
  SessionExpired: "02",
  UserNotExist: "03",
  UserEKYCNotFound: "04",
  FormatMessageInvalid: "05",
  PasswordExpired: "06",
  SystemError: "99",
  VerifyClientFailed: "100",
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

export function getStatusResponse(
  code: string,
  language: string
): {
  code: string;
  success: boolean;
  msg: string;
} {
  if (code === ERROR_CODE.Success) {
    return {
      code: ERROR_CODE.Success,
      success: true,
      msg: "Success",
    };
  }

  return {
    code,
    success: false,
    msg: _get(
      ERROR_CODE_WITH_MESSAGE,
      [language, code],
      "Có lỗi xảy ra vui lòng thử lại"
    ),
  };
}
