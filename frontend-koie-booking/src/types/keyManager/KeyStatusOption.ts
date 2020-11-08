import KEY_STATUS from '@/types/keyManager/KeyStatus';

export default interface KeyStatusOption {
  color: string;
  value: KEY_STATUS;
  label: string;
}

export type KeyStatusOptions = { [status: string]: KeyStatusOption };
