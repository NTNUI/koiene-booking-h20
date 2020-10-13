import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
}

export interface ReportSecondStepData {
  validForm: boolean;
  firewoodSupplyLabels: Array<string>;
  choppedUpSupplyLabels: Array<string>;
}

export interface ReportThirdStepData {
  validForm: boolean;
  equipment: Array<{
    displayName: TranslateResult;
    value: number;
    mutation: string;
  }>;
}

export interface ReportFourthStepData {
  validForm: boolean;
}
