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
  VerifyClientFailed: "100",
  AccountLocked: "12",
  PhoneNumberLock: "22",
  OTPExpired: "21",
  OTPInValid: "08",
  VerifyMaximum: "19",
  MaximumRequestSendOTP: "20",
  LockSendOTP: "22",
  Timeout: "Timeout",
  SendOTPFailed: "SendOTPFailed",
  UsernameNotMatch: "UsernameNotMatch",
  LockUserLoginFail5: "LockUserLoginFail5",
  LockUserSendOTP5: "LockUserSendOTP5",
  LockUserVerifyOTP5: "LockUserVerifyOTP5",
};

export const ERROR_CODE_OTP_PAGE = {
  Success: "00",
  // Code relate to verify otp
  SystemError: "16",
  UserNoToken: "17",
  OtpInvalid: "18",
  OtpExpire: "19",
  UserNoTokenActive: "20",
  MaximumRequestOtp: "21",
  MaxVerifyOtp: "22",
  OtpError: "23",
  TokenOutOfSync: "24",
  // End Code relate to verify otp
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
