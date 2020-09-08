import { TranslateResult } from 'vue-i18n';

export interface KeyInfoItems {
  title: TranslateResult;
  text: string;
  url?: TranslateResult;
  isLink: boolean;
  icon: string;
}

export interface KoieData {
  koieDescription: string;
  expandDescriptionCard: boolean;
}
