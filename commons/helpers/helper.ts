import { PARTNER_ID, SIGNATURE } from "commons/constants";
import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
export const generateRequestBody = () => {
  return {
    request: {
      requestId: uuidv4(),
      requestTime: "",
      partnerId: PARTNER_ID as string,
      signature: SIGNATURE as string,
    },
  };
};

export const isNumber = (val: number): boolean => {
  return !isNaN(val);
};

export const startTimer = async (
  duration: number = 59,
  elementDisplay: HTMLElement
) => {
  return new Promise((resolve) => {
    let timer: number = duration;
    let minutes: number | string;
    let seconds: number | string;
    const x = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      if (+minutes) {
        elementDisplay.textContent = `${minutes}:${seconds}`;
      } else {
        elementDisplay.textContent = `${seconds}`;
      }
      timer--;
      if (timer < 0) {
        elementDisplay.textContent = "";
        resolve(true);
        clearInterval(x);
      }
    }, 1000);
  });
};

export const parseInfoFromEKYC = (ekycData: any) => {
  if (!ekycData) {
    return {};
  }
  return {
    idNumber: _get(ekycData, "ocr.object.id", ""),
    fullNameOcr: _get(ekycData, "ocr.object.name", ""),
    gender: _get(ekycData, "ocr.object.gender", ""),
    birthDateOcr: _get(ekycData, "ocr.object.birth_day", ""),
    dateOfIssueOcr: _get(ekycData, "ocr.object.issue_date", ""),
    placeOfIssueOcr: _get(ekycData, "ocr.object.issue_place", ""),

    recent_location: _get(ekycData, "ocr.object.recent_location", ""),
    nationalityId: _get(ekycData, "ekycData.ocr.object.id", ""),
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
    validEKYC = false;
    messageEKYC = compareMsg;
  }

  if (livenessCardBack !== "success") {
    validEKYC = false;
    messageEKYC = livenessCardBackMsg;
  }

  if (livenessCardFront !== "success") {
    validEKYC = false;
    messageEKYC = livenessCardFrontMsg;
  }

  if (livenessFace !== "success") {
    validEKYC = false;
    messageEKYC = livenessFaceMsg;
  }

  return {
    validEKYC,
    messageEKYC,
  };
};
