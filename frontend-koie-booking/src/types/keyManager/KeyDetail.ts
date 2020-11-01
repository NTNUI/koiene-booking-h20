import KEY_STATUS from '@/types/keyManager/KeyStatus';

export default interface KeyDetail {
  email: string;
  koieName: string;
  startDate: string;
  endDate: string;
  keyStatus: KEY_STATUS;
}
