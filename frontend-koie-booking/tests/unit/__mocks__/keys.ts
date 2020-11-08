import KEY_STATUS from '@/types/keyManager/KeyStatus';
import KeyDetail from '@/types/keyManager/KeyDetail';

export function getKeyPickUps(): Array<KeyDetail> {
  return [
    {
      email: 'ola1@normann.com',
      koie: 'Mevasskoia',
      startDate: '2020-10-29',
      endDate: '2020-11-01',
      keyStatus: KEY_STATUS.NOT_PICKED_UP,
      uuid: 'ola1_pickup_uuid',
    },
    {
      email: 'ola2@normann.com',
      koie: 'Mevasskoia',
      startDate: '2020-10-30',
      endDate: '2020-11-01',
      keyStatus: KEY_STATUS.PICKED_UP,
      uuid: 'ola2_pickup_uuid',
    },
    {
      email: 'ola3@normann.com',
      koie: 'Flåkoia',
      startDate: '2020-10-25',
      endDate: '2020-11-01',
      keyStatus: KEY_STATUS.NOT_PICKED_UP,
      uuid: 'ola3_pickup_uuid',
    },
  ];
}

export function getKeyDeliveries(): Array<KeyDetail> {
  return [
    {
      email: 'ola1@normann.com',
      koie: 'Mevasskoia',
      startDate: '2020-10-26',
      endDate: '2020-11-01',
      keyStatus: KEY_STATUS.PICKED_UP,
      uuid: 'ola1_delivery_uuid',
    },
    {
      email: 'ola2@normann.com',
      koie: 'Mevasskoia',
      startDate: '2020-10-27',
      endDate: '2020-10-28',
      keyStatus: KEY_STATUS.DELIVERED,
      uuid: 'ola2_delivery_uuid',
    },
    {
      email: 'ola3@normann.com',
      koie: 'Mevasskoia',
      startDate: '2020-10-14',
      endDate: '2020-10-16',
      keyStatus: KEY_STATUS.PICKED_UP,
      uuid: 'ola3_delivery_uuid',
    },
  ];
}
