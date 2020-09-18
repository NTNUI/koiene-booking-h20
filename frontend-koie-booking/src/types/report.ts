import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
  labels: Array<TranslateResult>;
}

export interface ReportSecondStepData {
  gasStatus: number;
  numberOfGasContainers: number;
  edited: boolean;
  validForm: boolean;
}
