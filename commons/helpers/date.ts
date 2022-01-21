import _add from "date-fns/add";
import _format from "date-fns/format";

export function addHourFromNow(hoursNumber: number, format?: string): string {
  const date = _add(new Date(), {
    hours: hoursNumber,
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
