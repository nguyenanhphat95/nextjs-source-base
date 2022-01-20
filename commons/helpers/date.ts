import _add from "date-fns/add";
import _format from "date-fns/format";
export function addHourFromNow(hoursNumber: number, format?: string): string {
  const date = _add(new Date(), {
    hours: hoursNumber,
  });
  return _format(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ),
    format || "dd/MM/yyyy hh:mm"
  );
}
