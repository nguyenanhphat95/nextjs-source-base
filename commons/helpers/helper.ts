import { PARTNER_ID, SIGNATURE } from "commons/constants";
import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import { NextRouter } from "next/router";
import { LANGUAGE } from "commons/constants";

export function getLanguage(router: NextRouter): string {
  const lang = _get(router, "query.language");
  const listLanguage = Object.values(LANGUAGE);
  if (!listLanguage.find((_lang) => _lang === lang)) {
    return LANGUAGE.VI;
  }

  return lang;
}

function isHaveNumber(input: string) {
  let pattern = /[^a-zA-Z!@#$%^&*_=+-/]/;
  return pattern.test(input);
}

function isHaveString(input: string) {
  let pattern = /[^a-z0-9!@#$%^&*_=+-/]/;
  return pattern.test(input);
}

function isHaveSpecialCharater(input: string) {
  let pattern = /[!@#$%^&*_=+-/]/;
  return pattern.test(input);
}

function isHaveCharaterIgnored(input: string) {
  let pattern = /[^a-zA-Z0-9!@#$%^&*_=+-/]/;
  return pattern.test(input);
}

function CheckForRepeat(
  startIndex: number,
  originalString: string,
  charToCheck: string
) {
  var repeatCount = 1;
  for (var i = startIndex + 1; i < originalString.length; i++) {
    if (originalString.charAt(i) == charToCheck) {
      repeatCount++;
    } else {
      return repeatCount;
    }
  }
  return repeatCount;
}

function consecutiveCharMatch(input: string) {
  const regexp = /[^a-zA-Z0-9]/g;
  const str = input.replaceAll(regexp, "");
  for (var i = 0; i < str.length; i++) {
    var numberOfRepeats = CheckForRepeat(i, str, str.charAt(i));
    if (numberOfRepeats >= 3) {
      return true;
    }
  }
  return false;
}

function isHaveNormalChar(input: string) {
  let pattern = /[a-z]/;
  return pattern.test(input);
}

function isHavePasswordChar(input: string) {
  let pattern = "password";
  return input.toLocaleLowerCase().includes(pattern);
}

function onlyAlphabetOnAddress(inputVal: string) {
  let pattern = /[^a-zA-Z0-9.,/\s]/;
  return !pattern.test(inputVal);
}

export const isValidPassword1 = (password: string) => {
  if (password === "") return "01";
  else if (password.length < 6) return "02";
  else if (!isHaveNormalChar(password)) return "03";
  else if (!isHaveSpecialCharater(password)) return "04";
  else if (isHavePasswordChar(password)) return "05";
  else if (!isHaveNumber(password)) return "06";
  else if (!isHaveString(password)) return "07";
  else if (isHaveCharaterIgnored(password)) return "08";
  else if (consecutiveCharMatch(password)) return "19";
  return "00";
};

export const isValidPassword2 = (password1: string, password2: string) => {
  if (password2 === "") return "10";
  else if (password2 !== password1) return "11";
  return "00";
};




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

export const getMobileOperatingSystem = (): string => {
  var userAgent =
    navigator.userAgent || navigator.vendor || _get(window, "opera");

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !_get(window, "MSStream")) {
    return "iOS";
  }

  return "unknown";
};
