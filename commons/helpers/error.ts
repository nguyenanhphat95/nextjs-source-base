import { ResponseData } from "interfaces/ICommon";
import { NextRouter } from "next/router";
import _get from "lodash/get";

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

  // Code relate to purchase
  AccountWrong: "02",
  SignatureNotMatch: "08",
  PartnerIdNotExits: "12",
  LimitReached: "11",
  TxnIdExits: "14",
  AccountNotExits: "01",
  NotEnoughMoney: "05",
  ExpiredSession: "30",
  BTxnIdNotExits: "32",
  // End code relate to purchase
};

export const ERROR_CODE_WITH_MESSAGE_OTP_PAGE = {
  [ERROR_CODE_OTP_PAGE.AccountWrong]: "Tài khoản ngân hàng không đúng",
  [ERROR_CODE_OTP_PAGE.SignatureNotMatch]: "Chữ ký điện tử không hợp lệ",
  [ERROR_CODE_OTP_PAGE.PartnerIdNotExits]: "PartnerId không tồn tại",
  [ERROR_CODE_OTP_PAGE.LimitReached]: "Số tiền vượt quá giới hạ",
  [ERROR_CODE_OTP_PAGE.TxnIdExits]: "TxnId đã tồn tại",
  [ERROR_CODE_OTP_PAGE.AccountNotExits]: "Tài khoản/SyncID không tồn tạg",
  [ERROR_CODE_OTP_PAGE.NotEnoughMoney]: "Tài khoản không đủ tiền",
  [ERROR_CODE_OTP_PAGE.ExpiredSession]: "Hết hạn otp",
  [ERROR_CODE_OTP_PAGE.BTxnIdNotExits]: "bTxnId không tồn tại",

  [ERROR_CODE_OTP_PAGE.SystemError]:
    "Xin lỗi Quý khách, dịch vụ này đang được bảo trì. Quý khách vui lòng thử lại giao dịch sau ít phút hoặc liên hệ 19006060 để biết thêm chi tiết.",
  [ERROR_CODE_OTP_PAGE.UserNoToken]:
    "Tài khoản của Quý khách chưa đăng ký Phương thức xác thực. Quý khách vui lòng đăng ký Phương thức xác thực để thực hiện giao dịch.",
  [ERROR_CODE_OTP_PAGE.OtpInvalid]:
    "Mã xác thực không đúng. Quý khách vui lòng nhập lại.",
  [ERROR_CODE_OTP_PAGE.OtpExpire]:
    "Mã xác thực đã hết hạn. Quý khách vui lòng thực hiện lại giao dịch.",
  [ERROR_CODE_OTP_PAGE.UserNoTokenActive]:
    "Tài khoản của Quý khách chưa kích hoạt Phương thức xác thực. Quý khách vui lòng kích hoạt Phương thức xác thực để thực hiện giao dịch.",
  [ERROR_CODE_OTP_PAGE.MaximumRequestOtp]:
    "Phương thức xác thực của Quý khách đã bị khóa do không xác nhận quá số lần quy định. Quý khách vui lòng liên hệ tổng đài 19006060 để được hỗ trợ.",
  [ERROR_CODE_OTP_PAGE.MaxVerifyOtp]:
    "Quý khách đã nhập sai OTP quá 5 lần. Vui lòng liên hệ 1900 6060 hoặc đến điểm giao dịch HDBank gần nhất để được hỗ trợ",
  [ERROR_CODE_OTP_PAGE.OtpError]:
    "Đã có lỗi xảy ra trong quá trình xác thực. Quý khách vui lòng thực hiện lại hoặc liên hệ tổng đài 19006060 để được hỗ trợ.",
  [ERROR_CODE_OTP_PAGE.TokenOutOfSync]:
    "HDBank OTP của Quý khách đã mất đồng bộ với máy chủ. Quý khách vui lòng liên hệ tổng đài 19006060 để được hỗ trợ.",
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

export function getStatusResponseOtpPage(code: string): {
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
      ERROR_CODE_WITH_MESSAGE_OTP_PAGE,
      [code],
      ERROR_CODE_WITH_MESSAGE_OTP_PAGE[ERROR_CODE_OTP_PAGE.SystemError]
    ),
  };
}
