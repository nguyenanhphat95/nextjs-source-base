import { ERROR_CODE } from "commons/helpers";
import { addHourFromNow } from "commons/helpers/date";

// Constant for lock user
export const NUMBER_FAILED = 5;
export const KEY_LOGIN_FAIL = "ssologinfail";
export const KEY_VERIFY_OTP_FAIL = "otpverifyfail";
export const KEY_SEND_OTP_FAIL = "otpsendfail";
export const TIME_LOCK_LOGIN_FAIL = "86400"; // 24h -> seconds = 86400
// End Constant for lock user
export const NUMBER_ALLOW_ENTER_WRONG_OTP = 5;

export const ERROR_MESSAGE_VERIFY_USER = {
  [ERROR_CODE.MaximumRequestSendOTP]:
    "Quý khách đã nhận OTP quá số lần quy định. Vui lòng liên hệ 1900 6060 hoặc đến điểm giao dịch HDBank gần nhất để được hỗ trợ",
  [ERROR_CODE.LockUserVerifyOTP5]:
    "Quý khách đã nhận OTP quá 5 lần. Vui lòng liên hệ 1900 6060 hoặc đến điểm giao dịch HDBank gần nhất để được hỗ trợ",
  [ERROR_CODE.LockUserSendOTP5]:
    "Quý khách đã nhập sai OTP quá 5 lần. Vui lòng liên hệ 1900 6060 hoặc đến điểm giao dịch HDBank gần nhất để được hỗ trợ",
  [ERROR_CODE.LockUserLoginFail5]:
    "Tài khoản của Quý khách đang bị tạm khóa do đăng nhập sai nhiều lần. Vui lòng gọi 1900 6060 hoặc liên hệ PGD gần nhất để được hỗ trợ",
  [ERROR_CODE.UsernameNotMatch]:
    "Quý khách vui lòng sử dụng username đã đăng ký ban đầu",
  [ERROR_CODE.SendOTPFailed]: "Gửi OTP không thành công",
  [ERROR_CODE.Timeout]: "Kết nối gián đoạn. Qúy khách vui lòng thử lại sau",
  [ERROR_CODE.LockSendOTP]:
    "Quý khách chưa đăng ký phương thức xác thực hoặc đã bị khóa. Quý khách vui lòng liên hệ tổng đài 19006060 để được hỗ trợ",
  [ERROR_CODE.VerifyMaximum]: `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau 24h để sử dụng tiếp dịch vụ.(${addHourFromNow(
    24
  )})`,
  [ERROR_CODE.OTPInValid]:
    "Mã xác thực OTP không chính xác. Quý khách vui lòng nhập lại",
  [ERROR_CODE.OTPExpired]:
    "Mã xác thực đã hết thời gian hiệu lực. Quý khách vui lòng lấy lại mã xác thực mới.",
  [ERROR_CODE.PhoneNumberLock]: `Qúy khách đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau để sử dụng tiếp dịch vụ.(${addHourFromNow(
    24
  )})`,
  [ERROR_CODE.Unauthorized]:
    "Tên đăng nhập hoặc Mật khẩu không đúng. Quý khách vui lòng kiểm tra lại",
  [ERROR_CODE.SessionExpired]: "Session Expired",
  [ERROR_CODE.UserNotExist]: "User Not Exist",
  [ERROR_CODE.SessionIdNotFound]: "Session Id Not Found",
  [ERROR_CODE.FormatMessageInvalid]:
    "Tên đăng nhập hoặc Mật khẩu không hợp lệ. Qúy khách vui lòng kiểm tra lại",
  [ERROR_CODE.SystemError]: "System Error",
  [ERROR_CODE.PasswordExpired]:
    "Expired password requires accessing ebank.hdbank.com.vn to change password",
  [ERROR_CODE.VerifyClientFailed]: "Verify client failed",
  [ERROR_CODE.AccountLocked]:
    "Tài khoản của Quý khách đang bị tạm khóa. Vui lòng thử lại sau 24 giờ để sử dụng tiếp dịch vụ",
};
export const LOGIN_STEP = {
  step1: "stepLogin",
  step2: "stepChooseAccount",
  step3: "stepConfirmOtp",
  step4: "stepLoginSuccess",
};
