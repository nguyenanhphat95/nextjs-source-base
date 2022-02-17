export const ENABLE_WRITE_LOG = process.env.ENABLE_WRITE_LOG_CLIENT;
export const API_DOMAIN = process.env.API_DOMAIN_CLIENT;
export const PARTNER_ID = process.env.PARTNER_ID_CLIENT;
export const KEY_CHECK_SUM = process.env.KEY_CHECK_SUM_CLIENT;
export const CHANNEL_HDBS = process.env.CHANNEL_HDBS_CLIENT;
export const TOKEN_USERNAME = process.env.TOKEN_USERNAME_CLIENT;
export const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD_CLIENT;

export const API_DOMAIN_SBH_SANDBOX = process.env.API_DOMAIN_SANDBOX_SBH_CLIENT;
export const SERVICE_CODE_HDBS = process.env.SERVICE_CODE_CLIENT;
export const NARRATIVE_HDBS = process.env.NARRATIVE_CLIENT;
export const IS_REQ_CHAL_CODE_HDBS = process.env.IS_REQ_CHAL_CODE_CLIENT;
export const LANGUAGE = {
  VI: "vn",
  EN: "en",
};

export const KEY_TOKEN = "HDBS_TOKEN";

export const ERROR_CODE_WITH_MESSAGE = {
  [LANGUAGE.VI]: {
    "00": "Thành công",
    "01": "PartnerId không tìm thấy",
    "02": "Merchant không tìm thấy",
    "03": "Terminal không tìm thấy",
    "04": "User eKYC không tìm thấy",
    "05": "Private key không tìm thấy",
    "06": "Ekyc user đã tồn tại",
    "07": "Register eKyc user thất bại",
    "08": "Ekyc account đã tồn tại",
    "09": "Account otp không khớp",
    "10": "Ekyc account không tìm thấy",
    "99": "System error",
    "98": "RequestId bắt buộc",
    "97": "Channel bắt buộc",
    "96": "Language bắt buộc",
    "95": "Transaction time bắt buộc",
    "94": "PartnerId bắt buộc",
    "93": "Checksum bắt buộc",
    "92": "Không hợp lệ transaction time",
    "91": "Không hợp lệ checksum",
    "90": "Không thể lấy merchant",
    "89": "UserId bắt buộc",
    "88": "Client no bắt buộc",
    "87": "MerchantId bắt buộc",
    "86": "TerminalId bắt buộc",
    "85": "Esb check user ekyc thất bại",
    "84": "Esb Insert ekyc account thất bại",
    "83": "Account otp bắt buộc",
    "82": "Esb confirm ekyc present thất bại",
    "81": "HDBS register user thất bại",
    "80": "Esb Update ekyc account thất bại",
    "79": "Token bắt buộc",
    "78": "Username bắt buộc",
    "77": "Password bắt buộc",
    "76": "Username or password incorrect",
    "75": "Ekyc type bắt buộc",
    "74": "Không hợp lệ ekyc type",
    "73": "Email bắt buộc",
    "72": "Account no bắt buộc",
    "71": "Phone number bắt buộc",
    "70": "Full name bắt buộc",
    "69": "Birth day bắt buộc",
    "68": "Full name ocr bắt buộc",
    "67": "Birth day ocr bắt buộc",
    "66": "Date of issue bắt buộc",
    "65": "Date of issue ocr bắt buộc",
    "64": "Place of issue bắt buộc",
    "63": "Place of issue ocr bắt buộc",
    "62": "Expired of issue bắt buộc",
    "61": "Expired of issue ocr bắt buộc",
    "60": "Gender bắt buộc",
    "59": "Address bắt buộc",
    "58": "Current address bắt buộc",
    "57": "Nationality bắt buộc",
    "56": "Branch bắt buộc",
    "55": "Marital status bắt buộc",
    "54": "Face matching bắt buộc",
    "53": "Id number bắt buộc",
    "52": "Id number type bắt buộc",
    "51": "Esb inquiry ekyc present thất bại",
    "50": "Phương thức không hợp lệ",
    "49": "Yêu cầu không hợp lệ",
    "41": "Ngày phát hành không hợp lệ",
    "36": "Kiểm tra tài khoản HDBS không thành công",
    "37": "Tạo tài khoản HDBS không thành công",
    "38": "Invalid expired of issue ocr",
    "39": "Invalid expired of issue",
    "40": "Invalid date of issue ocr",
  },
  [LANGUAGE.EN]: {
    "00": "Success",
    "01": "PartnerId not found",
    "02": "Merchant not found",
    "03": "Terminal not found",
    "04": "User eKYC not found",
    "05": "Private key not found",
    "06": "Ekyc user already exists",
    "07": "Register eKyc user failed",
    "08": "Ekyc account already exists",
    "09": "Account otp not match",
    "10": "Ekyc account not found",
    "99": "System error",
    "98": "RequestId is required",
    "97": "Channel is required",
    "96": "Language is required",
    "95": "Transaction time is required",
    "94": "PartnerId is required",
    "93": "Checksum is required",
    "92": "Invalid transaction time",
    "91": "Invalid checksum",
    "90": "Can not get merchant",
    "89": "UserId is required",
    "88": "Client no is required",
    "87": "MerchantId is required",
    "86": "TerminalId is required",
    "85": "Esb check user ekyc failed",
    "84": "Esb Insert ekyc account failed",
    "83": "Account otp is required",
    "82": "Esb confirm ekyc present failed",
    "81": "HDBS register user failed",
    "80": "Esb Update ekyc account failed",
    "79": "Token is required",
    "78": "Username is required",
    "77": " Password is required",
    "76": "Username or password incorrect",
    "75": "Ekyc type is required",
    "74": "Invalid ekyc type",
    "73": "Email is required",
    "72": "Account no is required",
    "71": "Phone number is required",
    "70": "Full name is required",
    "69": "Birth day is required",
    "68": "Full name ocr is required",
    "67": "Birth day ocr is required",
    "66": "Date of issue is required",
    "65": "Date of issue ocr is required",
    "64": "Place of issue is required",
    "63": "Place of issue ocr is required",
    "62": "Expired of issue is required",
    "61": "Expired of issue ocr is required",
    "60": "Gender is required",
    "59": "Address is required",
    "58": "Current address is required",
    "57": "Nationality is required",
    "56": "Branch is required",
    "55": "Marital status is required",
    "54": "Face matching is required",
    "53": "Id number is required",
    "52": "Id number type is required",
    "51": "Esb inquiry ekyc present failed",
    "50": "Invalid method",
    "49": "Invalid request",
    "41": "Invalid date of issue",
    "36": "Check HDBS account failed",
    "37": "Create HDBS account failed",
    "38": "Invalid expired of issue ocr",
    "39": "Invalid expired of issue",
    "40": "Invalid date of issue ocr",
  },
};
