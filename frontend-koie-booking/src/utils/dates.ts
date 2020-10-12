import dayjs from 'dayjs';
require('dayjs/locale/nb');
dayjs.locale('nb');

export function getDateString(baseDate?: string, addDays?: number): string {
  let resultString: string;
  if (baseDate && addDays) {
    resultString = new Date(new Date(baseDate).getTime() + addDays * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
  } else if (baseDate) {
    resultString = new Date(baseDate).toISOString().substr(0, 10);
  } else if (addDays) {
    resultString = new Date(new Date().getTime() + addDays * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
  } else {
    resultString = new Date().toISOString().substr(0, 10);
  }
  return resultString;
}

export function getDate(baseDate?: string, addDays?: number): Date {
  let resultDate: Date;
  if (baseDate && addDays) {
    resultDate = new Date(new Date(baseDate).getTime() + addDays * 24 * 60 * 60 * 1000);
  } else if (baseDate) {
    resultDate = new Date(baseDate);
  } else if (addDays) {
    resultDate = new Date(new Date().getTime() + addDays * 24 * 60 * 60 * 1000);
  } else {
    resultDate = new Date();
  }
  return resultDate;
}

export function addToDate(startDate: string, howMany: number, timeUnit: dayjs.OpUnitType): string {
  const date = dayjs(startDate + 'T00:00:00.000Z');
  return date.add(howMany, timeUnit).format('YYYY-MM-DD');
}

export function formatDate(dateISO: string, formatString: string): string {
  const date = dayjs(dateISO + 'T00:00:00.000Z');
  return date.format(formatString);
}
