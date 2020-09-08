export interface CalendarData {
  menu1: boolean;
  menu2: boolean;
  beds: number;
  disabledDates: Array<String>;
  minimumDate: string;
  maximumDate: string;
  maximumDateTo: string;
  error: boolean;
  updatedDateFrom: boolean;
  temporaryDateTo: string;
  temporaryDateFrom: string;
  setDatesFinished: boolean;
}
