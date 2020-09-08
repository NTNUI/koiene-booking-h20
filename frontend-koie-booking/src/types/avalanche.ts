import { TranslateResult } from 'vue-i18n';

export interface AvalancheData {
  result: string;
  levelFirstDay: string;
  levelSecondDay: string;
  levelThirdDay: string;
  firstDay: string;
  secondDay: string;
  thirdDay: string;
  fromDate: string;
  nextDate: string;
  lastDate: string;
  warningTypes: Array<TranslateResult>;
  colors: Array<string>;
}
