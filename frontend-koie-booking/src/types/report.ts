import { TranslateResult } from 'vue-i18n';

export interface ReportData {
  step: number;
  steps: number;
}

export interface ReportSecondStepData {
  validForm: boolean;
  gasIsFull: number;
  firewoodSupply: number;
  firewoodSupplyLabels: Array<string>;
  choppedUpWoodSupply: number;
  choppedUpSupplyLabels: Array<string>;
}

export interface ReportThirdStepData {
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
  validForm: boolean;
  boat_status: number;
  canoe_status: number;
  life_jackets_status: number;
  feedback: string;
}
