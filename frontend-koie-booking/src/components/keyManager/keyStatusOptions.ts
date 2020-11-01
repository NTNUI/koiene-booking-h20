import { KeyStatusOptions } from '@/types/keyManager/KeyStatusOption';
import KEY_STATUS from '@/types/keyManager/KeyStatus';
import scssVars from '@/styles/variables.scss';

export const keyPickUpStatusOptions: KeyStatusOptions = {
  [KEY_STATUS.NOT_PICKED_UP]: {
    color: scssVars.globalColorRedStrong,
    value: KEY_STATUS.NOT_PICKED_UP,
    label: 'Ikke hentet',
  },
  [KEY_STATUS.PICKED_UP]: {
    color: scssVars.globalColorGreenStrong,
    value: KEY_STATUS.PICKED_UP,
    label: 'Hentet',
  },
};

export const keyDeliverStatusOptions: KeyStatusOptions = {
  [KEY_STATUS.PICKED_UP]: {
    color: scssVars.globalColorRedStrong,
    value: KEY_STATUS.PICKED_UP,
    label: 'Ikke levert',
  },
  [KEY_STATUS.DELIVERED]: {
    color: scssVars.globalColorGreenStrong,
    value: KEY_STATUS.DELIVERED,
    label: 'Levert',
  },
};
