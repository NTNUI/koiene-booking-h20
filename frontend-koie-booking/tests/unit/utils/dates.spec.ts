import dayjs from 'dayjs';
import { addToDate, formatDate } from '@/utils/dates';

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

  const expected = ['2020-01-04', '2019-12-28', '2020-02-29', '2022-01-01', '2020-02-20'];
  // Act/Assert
  for (let i = 0; i < inputs.length; i++) {
    run(inputs[i].startDate, inputs[i].howMany, inputs[i].what, expected[i]);
  }
});
