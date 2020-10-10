import dayjs from 'dayjs';
import { addToDate, formatDate } from '@/utils/dates';
import { Dictionary } from 'vue-router/types/router';

require('dayjs/locale/nb');
dayjs.locale('nb');

describe('util Function addToDate', () => {
  function run(startDate: string, howMany: number, what: dayjs.OpUnitType, expected: string): void {
    it('adds ' + howMany + ' ' + what + ' to date ' + startDate, () => {
      // Act
      const resultDate = addToDate(startDate, howMany, what);
      // Assert
      expect(resultDate).toEqual(expected);
    });
  }
  // Arrange
  interface addToDateTestInput {
    startDate: string;
    howMany: number;
    what: dayjs.OpUnitType;
  }
  const inputs: Array<addToDateTestInput> = [
    { startDate: '2020-01-01', howMany: 3, what: 'day' },
    { startDate: '2020-01-01', howMany: -3, what: 'week' },
    { startDate: '2020-01-31', howMany: 1, what: 'month' },
    { startDate: '2020-01-01', howMany: 2, what: 'year' },
    { startDate: '2020-01-01', howMany: 50, what: 'day' },
  ];
  const expected: string[] = ['2020-01-04', '2019-12-11', '2020-02-29', '2022-01-01', '2020-02-20'];
  // Act and Assert
  for (let i = 0; i < inputs.length; i++) {
    run(inputs[i].startDate, inputs[i].howMany, inputs[i].what, expected[i]);
  }
});

describe('util Function formatDate', () => {
  function run(dateISO: string, formatString: string, expected: string) {
    it('formats the date ' + dateISO + ' to the format ' + formatString, () => {
      // Act
      const formattedDateString = formatDate(dateISO, formatString);
      // Assert
      expect(formattedDateString).toEqual(expected);
    });
  }
  // Arrange
  const inputs: Array<Dictionary<string>> = [
    { dateISO: '2020-01-01', formatString: 'D. MMMM YYYY' },
    { dateISO: '2020-02-24', formatString: 'MM/DD/YY' },
    { dateISO: '2020-10-10', formatString: 'dddd' },
    { dateISO: '2020-10-12', formatString: 'dd D.M.YYYY' },
  ];
  const expected: string[] = ['1. januar 2020', '02/24/20', 'lørdag', 'ma 12.10.2020']
  // Act and Assert
  for (let i = 0; i < inputs.length; i++) {
    run(inputs[i].dateISO, inputs[i].formatString, expected[i]);
  }
});
