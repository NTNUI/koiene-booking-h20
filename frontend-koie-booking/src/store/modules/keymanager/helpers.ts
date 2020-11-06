import { APIKeyDetail } from '@/types/keyManager/KeyDetail';
import KeyDetail from '@/types/keyManager/KeyDetail';
import KEY_STATUS from '@/types/keyManager/KeyStatus';

export function convertAPIKeyDetailToKeyDetail(apiKeyDetail: APIKeyDetail): KeyDetail {
  const keyStatus: KEY_STATUS = (<any>KEY_STATUS)[apiKeyDetail.key_status.toUpperCase()];
  return {
    email: apiKeyDetail.contact_email,
    koieName: apiKeyDetail.koie,
    startDate: apiKeyDetail.arrival_date,
    endDate: apiKeyDetail.departure_date,
    keyStatus: keyStatus,
    uuid: apiKeyDetail.uuid,
  };
}
