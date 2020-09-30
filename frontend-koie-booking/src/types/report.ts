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
  equipment: Array<{
    displayName: TranslateResult;
    value: number;
    mutation: string;
  }>;
  otherFaults: string;
}

export interface ReportFourthStepData {
  edited: boolean;
  validForm: boolean;
  boat_status: number;
  canoe_status: number;
  life_jackets_status: number;
  feedback: string;
}
