import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
  labels: Array<TranslateResult>;
}
