import { TranslateResult } from 'vue-i18n';

export interface BookingData {
  step: number;
  labels: Array<TranslateResult>;
}

export interface BookingFirstStepData {
  bedsTotal: number;
  bedsChosen: number;
  error: boolean;
}

export interface BookingSecondStepData {
  bedsChosen: number;
  bookingStep: number;
  guests: Array<Guest>;
  numberRules: object;
  nameRules: object;
  emailStrictRules: object;
  emailLooseRules: object;
  edited: boolean;
  validForm: boolean;
  memberPrice: number;
  nonMemberPrice: number;
}

export interface BookingThirdStepData {
  complete: boolean;
  stripeOptions: object;
  totalPrice: number;
}

export interface Guest {
  name: string;
  number: string;
  isMember: boolean;
  email?: string;
}
