import _add from "date-fns/add";
import _format from "date-fns/format";
import _isValid from "date-fns/isValid";

export function addHourFromNow(hoursNumber: number, format?: string): string {
  const date = _add(new Date(), {
    hours: hoursNumber,
  });
  return formatDate(date, format);
}

export function addMinuteFromNow(
  minutesNumber: number,
  format?: string
): string {
  const date = _add(new Date(), {
    minutes: minutesNumber,
  });
  return formatDate(date, format);
}

export function addYearFromDate(
  date: Date,
  yearsNumber: number,
  format?: string
): string {
  const dateNew = _add(date, {
    years: yearsNumber,
  });
  return formatDate(dateNew, format);
}

export function addYearFromNow(yearsNumber: number, format?: string): string {
  const date = _add(new Date(), {
    years: yearsNumber,
  });
  return formatDate(date, format);
}

export function getTodayWithFormat(format?: string): string {
  const date = new Date();
  return formatDate(date, format);
}
export function formatDate(date: Date, format?: string): string {
  if (!date || !_isValid(date)) {
    return "";
  }

  return _format(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ),
    format || "dd/MM/yyyy H:mm:ss"
  );
}

/**
 * Returns of function
 * @return {1} is date1 > date2
 * @return {-1} is date1 < date2
 * @return {0} is date1 = date2
 */
export function compareTwoDate(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  if (time1 > time2) {
    return -1;
  }

  if (time1 < time2) {
    return 1;
  }
  return 0;
}

export function getValidStringDate(dateStr: string): string {
  if (!dateStr || !_isValid(new Date(dateStr))) {
    return "";
  }
  return dateStr;
}
