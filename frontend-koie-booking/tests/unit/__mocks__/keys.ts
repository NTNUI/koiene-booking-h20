import KEY_STATUS from '@/types/keyManager/KeyStatus';
import KeyDetail from '@/types/keyManager/KeyDetail';

export function getKeyPickUps(): Array<KeyDetail> {
  return [
    {
      email: 'ola@normann.com',
      koieName: 'Mevasskoia',
      startDate: '2020-10-29',
      endDate: '2020-11-01',
      status: KEY_STATUS.NOT_PICKED_UP,
    },
    {
      email: 'ola@normann.com',
      koieName: 'Mevasskoia',
      startDate: '2020-10-30',
      endDate: '2020-11-01',
      status: KEY_STATUS.PICKED_UP,
    },
    {
      email: 'ola@normann.com',
      koieName: 'Flåkoia',
      startDate: '2020-10-25',
      endDate: '2020-11-01',
      status: KEY_STATUS.NOT_PICKED_UP,
    },
  ];
}

export function getKeyDeliveries(): Array<KeyDetail> {
  return [
    {
      email: 'ola@normann.com',
      koieName: 'Mevasskoia',
      startDate: '2020-10-26',
      endDate: '2020-11-01',
      status: KEY_STATUS.PICKED_UP,
    },
    {
      email: 'ola@normann.com',
      koieName: 'Mevasskoia',
      startDate: '2020-10-27',
      endDate: '2020-10-28',
      status: KEY_STATUS.DELIVERED,
    },
    {
      email: 'ola@normann.com',
      koieName: 'Mevasskoia',
      startDate: '2020-10-14',
      endDate: '2020-10-16',
      status: KEY_STATUS.PICKED_UP,
    },
  ];
}
