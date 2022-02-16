import _add from "date-fns/add";
import _format from "date-fns/format";

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

export function compareTwoDateDesc(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  if (time1 > time2) {
    return 1;
  }

  if (time1 < time2) {
    return -1;
  }
  return 0;
}
