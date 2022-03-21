import _get from "lodash/get";
import { compareTwoDate, addYearFromNow, addYearFromDate } from "./date";
import _differenceInDays from "date-fns/differenceInDays";
interface EKYCData {
  idNumber: string | number;
  idNumberType: string;
  fullNameOcr: string;
  gender: string;
  birthDateOcr: string;
  dateOfIssueOcr: string;
  placeOfIssueOcr: string;
  expireOfIssueOcr: string;
  address: string;
  address2?: string;
  nationalityName: string;
  email?: string;
  phoneNumber?: string;
  imgBackKey: string;
  imgFrontKey: string;
  imgFaceKey: string;
}

const enum TYPE_ID {
  CMND1 = 0,
  CMND2 = 1,
  CCCD1 = 2,
  CCCD2 = 5,
}

export const parseInfoFromEKYC = (ekycData: any): EKYCData => {
  return {
    imgBackKey: _get(ekycData, "ocr.imgs.img_back"),
    imgFrontKey: _get(ekycData, "ocr.imgs.img_front"),
    imgFaceKey: _get(ekycData, "masked.imgs.img"),
    idNumber:
      _get(ekycData, "ocr.object.id") === "-"
        ? ""
        : _get(ekycData, "ocr.object.id", ""),
    idNumberType:
      _get(ekycData, "ocr.object.card_type") === "CĂN CƯỚC CÔNG DÂN"
        ? "CCCD"
        : "CMND",
    fullNameOcr:
      _get(ekycData, "ocr.object.name") === "-"
        ? ""
        : _get(ekycData, "ocr.object.name", ""),
    gender:
      _get(ekycData, "ocr.object.gender") === "-"
        ? ""
        : _get(ekycData, "ocr.object.gender") === "Nam"
        ? "M"
        : "F",
    birthDateOcr:
      _get(ekycData, "ocr.object.birth_day") === "-"
        ? ""
        : _get(ekycData, "ocr.object.birth_day", ""),
    dateOfIssueOcr:
      _get(ekycData, "ocr.object.issue_date") === "-"
        ? ""
        : _get(ekycData, "ocr.object.issue_date", ""),
    placeOfIssueOcr:
      _get(ekycData, "ocr.object.issue_place") === "-"
        ? ""
        : _get(ekycData, "ocr.object.issue_place", ""),
    expireOfIssueOcr:
      _get(ekycData, "ocr.object.valid_date") === "-"
        ? ""
        : _get(ekycData, "ocr.object.valid_date", ""),
    address:
      _get(ekycData, "ocr.object.recent_location") === "-"
        ? ""
        : _get(ekycData, "ocr.object.recent_location", ""),
    nationalityName:
      _get(ekycData, "ocr.object.nationality") === "-"
        ? ""
        : _get(ekycData, "ocr.object.nationality", ""),
  };
};

export const checkResultEkyc = (
  ekycData: any
): {
  validEKYC: boolean;
  messageEKYC: string;
} => {
  let validEKYC = true;
  let messageEKYC = "";
  const compareObj = _get(ekycData, "compare.object.msg");
  const compareMsg = _get(ekycData, "compare.object.result");

  const livenessCardBack = _get(ekycData, "liveness_card_back.object.liveness");
  const livenessCardBackMsg = _get(
    ekycData,
    "liveness_card_back.object.liveness_msg"
  );

  const livenessCardFront = _get(
    ekycData,
    "liveness_card_front.object.liveness"
  );
  const livenessCardFrontMsg = _get(
    ekycData,
    "liveness_card_front.object.liveness_msg"
  );

  const livenessFace = _get(ekycData, "liveness_face.object.liveness");
  const livenessFaceMsg = _get(ekycData, "liveness_face.object.liveness_msg");

  if (compareObj === "NOMATCH") {
    return {
      validEKYC: false,
      messageEKYC: compareMsg,
    };
  }

  if (livenessCardBack !== "success") {
    return {
      validEKYC: false,
      messageEKYC: livenessCardBackMsg,
    };
  }

  if (livenessCardFront !== "success") {
    return {
      validEKYC: false,
      messageEKYC: livenessCardFrontMsg,
    };
  }
  if (livenessFace !== "success") {
    return {
      validEKYC: false,
      messageEKYC: livenessFaceMsg,
    };
  }

  // Start: check expire of cmnd/cccd
  const type_id = _get(ekycData, "ocr.object.type_id");
  const dateOfIssue =
    _get(ekycData, "ocr.object.issue_date") === "-"
      ? ""
      : _get(ekycData, "ocr.object.issue_date");
  const expiredDate =
    _get(ekycData, "ocr.object.valid_date") === "-"
      ? ""
      : _get(ekycData, "ocr.object.valid_date");

  const checkIdentityExpired = (dateOfIssue: string, expiredDate: string) => {
    // Check hiệu lực cmnd/cccd < 30 ngày
    if (
      _differenceInDays(
        new Date(new Date(dateOfIssue)),
        new Date(new Date(expiredDate))
      ) === 29
    ) {
      return {
        validEKYC: true,
        messageEKYC: `CMND/CCCD của quý khách sắp hết hạn. Quý khách vui lòng cập nhật thông tin giấy tờ tùy thân mới tại PGD gần nhất của HDBS trước ngày ${expiredDate}`,
      };
    }

    // Kiểm tra cmnd/cccd đã hết hạn hay chưa
    if (
      compareTwoDate(
        new Date(new Date(dateOfIssue)),
        new Date(new Date(expiredDate))
      )
    ) {
      return {
        validEKYC: true,
        messageEKYC:
          "CMND/CCCD của quý khách đã hết hạn. Quý khách vui lòng cập nhật thông tin giấy tờ tùy thân mới tại PGD gần nhất của HDBS",
      };
    }

    return {
      validEKYC: false,
      messageEKYC: "",
    };
  };

  if (!dateOfIssue) {
    return {
      validEKYC: false,
      messageEKYC: "Không đọc được ngày phát hành thẻ. Vui lòng thữ lại",
    };
  }

  if (
    type_id === TYPE_ID.CCCD1 ||
    type_id === TYPE_ID.CCCD2 ||
    type_id === TYPE_ID.CMND1 ||
    type_id === TYPE_ID.CMND2
  ) {
    if (type_id === TYPE_ID.CMND1 || type_id === TYPE_ID.CMND2) {
      const dateOfIssueFormat = formatDateOfEKYC(dateOfIssue);
      const expiredDateNew = addYearFromDate(
        new Date(dateOfIssueFormat),
        15,
        "MM/dd/yyyy"
      );
      return checkIdentityExpired(dateOfIssueFormat, expiredDateNew);
    }

    if (type_id === TYPE_ID.CCCD1 || type_id === TYPE_ID.CCCD2) {
      if (expiredDate) {
        const dateOfIssueFormat = formatDateOfEKYC(dateOfIssue);
        const expiredDateFormat = formatDateOfEKYC(expiredDate);
        return checkIdentityExpired(dateOfIssueFormat, expiredDateFormat);
      }
    }
  } else {
    return {
      validEKYC: false,
      messageEKYC: "Không đúng loại giấy tờ CMND hoặc CCCD. Vui lòng thữ lại",
    };
  }
  // End: check expire of cmnd/cccd

  return {
    validEKYC,
    messageEKYC,
  };
};

export const formatDateOfEKYC = (dateEkyc: string): string => {
  if (!dateEkyc) {
    return "";
  }
  const dateSplit = dateEkyc.split("/");
  if (dateSplit.length === 3) {
    const [date, month, year] = dateSplit;
    return month + "/" + date + "/" + year;
  }
  return "";
};
