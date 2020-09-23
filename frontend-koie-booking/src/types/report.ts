import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
  labels: Array<TranslateResult>;
}

export interface ReportSecondStepData {
  edited: boolean;
  validForm: boolean;
  gasIsFull: number;
  firewoodSupply: number;
  firewoodSupplyLabels: Array<String>;
  choppedUpWoodSupply: number;
  choppedUpSupplyLabels: Array<String>;
}

export interface ReportThirdStepData {
  edited: boolean;
  validForm: boolean;
  smokeDetectorIsWorking: number;
  equipment: Array<{ name: TranslateResult; value: number }>;
}
