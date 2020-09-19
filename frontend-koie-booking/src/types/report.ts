import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
  labels: Array<TranslateResult>;
}

export interface ReportSecondStepData {
  edited: boolean;
  validForm: boolean;
  gasStatus: number;
  woodLevel: number;
  woodLabels: Array<String>;
}

export interface ReportThirdStepData {
  edited: boolean;
  validForm: boolean;
  equipment: Array<object>;
}
