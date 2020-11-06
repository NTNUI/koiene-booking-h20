import KEY_STATUS from '@/types/keyManager/KeyStatus';

export default interface KeyDetail {
  email: string;
  koie: string;
  startDate: string;
  endDate: string;
  keyStatus: KEY_STATUS;
  uuid: string;
}

export interface APIKeyDetail {
  id: number;
  price: number;
  koie: string;
  user: number;
  uuid: string;
  booking_transaction_id: any;
  arrival_date: string;
  departure_date: string;
  contact_email: string;
  guests_member: number;
  guests_not_member: number;
  paid: boolean;
  created: string;
  key_status: string;
}

export type KeyDetailDictionary = { [uuid: string]: KeyDetail };
