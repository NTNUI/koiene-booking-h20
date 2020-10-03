import AdminBooking, { AdminBookingDictionary, APIAdminBooking } from '@/types/admin/AdminBooking';
import { addToDate } from '@/utils/dates';

export const startDate = '2020-10-03';

export default function getKoieData(): Array<APIAdminBooking> {
  const dates = [startDate];

  for (let i = 1; i < 10; i++) {
    dates.push(addToDate(startDate, i, 'day'));
  }

  return [
    {
      name: 'Flåkoia',
      slug: 'flåkoia',
      number_of_beds: 11,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 0,
        [dates[1]]: 0,
        [dates[2]]: 0,
        [dates[3]]: 11,
        [dates[4]]: 9,
        [dates[5]]: 0,
        [dates[6]]: 11,
        [dates[7]]: 11,
        [dates[8]]: 11,
        [dates[9]]: 11
      }
    },
    {
      name: 'Mevasskoia',
      slug: 'mevasskoia',
      number_of_beds: 5,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 5,
        [dates[1]]: 5,
        [dates[2]]: 5,
        [dates[3]]: 1,
        [dates[4]]: 0,
        [dates[5]]: 3,
        [dates[6]]: 5,
        [dates[7]]: 2,
        [dates[8]]: 5,
        [dates[9]]: 5
      }
    },
    {
      name: 'Øvensenget',
      slug: 'øvensenget',
      number_of_beds: 8,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 8,
        [dates[1]]: 8,
        [dates[2]]: 8,
        [dates[3]]: 8,
        [dates[4]]: 8,
        [dates[5]]: 8,
        [dates[6]]: 8,
        [dates[7]]: 8,
        [dates[8]]: 8,
        [dates[9]]: 8
      }
    },
    {
      name: 'Kåsen',
      slug: 'kåsen',
      number_of_beds: 8,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 8,
        [dates[1]]: 8,
        [dates[2]]: 8,
        [dates[3]]: 8,
        [dates[4]]: 8,
        [dates[5]]: 8,
        [dates[6]]: 8,
        [dates[7]]: 8,
        [dates[8]]: 8,
        [dates[9]]: 8
      }
    },
    {
      name: 'Stakkslettbua',
      slug: 'stakkslettbua',
      number_of_beds: 11,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 11,
        [dates[1]]: 11,
        [dates[2]]: 11,
        [dates[3]]: 11,
        [dates[4]]: 11,
        [dates[5]]: 11,
        [dates[6]]: 11,
        [dates[7]]: 11,
        [dates[8]]: 11,
        [dates[9]]: 11
      }
    },
    {
      name: 'Holmsåkoia',
      slug: 'holmsåkoia',
      number_of_beds: 20,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 20,
        [dates[1]]: 20,
        [dates[2]]: 20,
        [dates[3]]: 20,
        [dates[4]]: 20,
        [dates[5]]: 20,
        [dates[6]]: 20,
        [dates[7]]: 20,
        [dates[8]]: 20,
        [dates[9]]: 20
      }
    },
    {
      name: 'Sonvasskoia',
      slug: 'sonvasskoia',
      number_of_beds: 8,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 8,
        [dates[1]]: 8,
        [dates[2]]: 8,
        [dates[3]]: 8,
        [dates[4]]: 8,
        [dates[5]]: 8,
        [dates[6]]: 8,
        [dates[7]]: 8,
        [dates[8]]: 8,
        [dates[9]]: 8
      }
    },
    {
      name: 'Nicokoia',
      slug: 'nicokoia',
      number_of_beds: 8,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 8,
        [dates[1]]: 8,
        [dates[2]]: 8,
        [dates[3]]: 8,
        [dates[4]]: 8,
        [dates[5]]: 8,
        [dates[6]]: 8,
        [dates[7]]: 8,
        [dates[8]]: 8,
        [dates[9]]: 8
      }
    },
    {
      name: 'Telin',
      slug: 'telin',
      number_of_beds: 9,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 9,
        [dates[1]]: 9,
        [dates[2]]: 9,
        [dates[3]]: 9,
        [dates[4]]: 9,
        [dates[5]]: 9,
        [dates[6]]: 9,
        [dates[7]]: 9,
        [dates[8]]: 9,
        [dates[9]]: 9
      }
    },
    {
      name: 'Lyngli',
      slug: 'lyngli',
      number_of_beds: 13,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 13,
        [dates[1]]: 13,
        [dates[2]]: 13,
        [dates[3]]: 13,
        [dates[4]]: 13,
        [dates[5]]: 13,
        [dates[6]]: 13,
        [dates[7]]: 13,
        [dates[8]]: 13,
        [dates[9]]: 13
      }
    },
    {
      name: 'Kråklikåten',
      slug: 'kråklikåten',
      number_of_beds: 4,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 4,
        [dates[1]]: 4,
        [dates[2]]: 4,
        [dates[3]]: 4,
        [dates[4]]: 4,
        [dates[5]]: 4,
        [dates[6]]: 4,
        [dates[7]]: 4,
        [dates[8]]: 4,
        [dates[9]]: 4
      }
    },
    {
      name: 'Heinfjordstua',
      slug: 'heinfjordstua',
      number_of_beds: 25,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 25,
        [dates[1]]: 25,
        [dates[2]]: 25,
        [dates[3]]: 25,
        [dates[4]]: 25,
        [dates[5]]: 25,
        [dates[6]]: 25,
        [dates[7]]: 25,
        [dates[8]]: 25,
        [dates[9]]: 25
      }
    },
    {
      name: 'Høgnabu',
      slug: 'høgnabu',
      number_of_beds: 6,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 6,
        [dates[1]]: 6,
        [dates[2]]: 6,
        [dates[3]]: 6,
        [dates[4]]: 6,
        [dates[5]]: 6,
        [dates[6]]: 6,
        [dates[7]]: 6,
        [dates[8]]: 6,
        [dates[9]]: 6
      }
    },
    {
      name: 'Stabburet',
      slug: 'stabburet',
      number_of_beds: 2,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 2,
        [dates[1]]: 2,
        [dates[2]]: 2,
        [dates[3]]: 2,
        [dates[4]]: 2,
        [dates[5]]: 2,
        [dates[6]]: 2,
        [dates[7]]: 2,
        [dates[8]]: 2,
        [dates[9]]: 2
      }
    },
    {
      name: 'Vekvessætra',
      slug: 'vekvessætra',
      number_of_beds: 20,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 20,
        [dates[1]]: 20,
        [dates[2]]: 20,
        [dates[3]]: 20,
        [dates[4]]: 20,
        [dates[5]]: 20,
        [dates[6]]: 20,
        [dates[7]]: 20,
        [dates[8]]: 20,
        [dates[9]]: 20
      }
    },
    {
      name: 'Fosenkoia',
      slug: 'fosenkoia',
      number_of_beds: 10,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 10,
        [dates[1]]: 10,
        [dates[2]]: 10,
        [dates[3]]: 10,
        [dates[4]]: 10,
        [dates[5]]: 10,
        [dates[6]]: 10,
        [dates[7]]: 10,
        [dates[8]]: 10,
        [dates[9]]: 10
      }
    },
    {
      name: 'Tågåbu',
      slug: 'tågåbu',
      number_of_beds: 6,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 6,
        [dates[1]]: 6,
        [dates[2]]: 6,
        [dates[3]]: 6,
        [dates[4]]: 6,
        [dates[5]]: 6,
        [dates[6]]: 6,
        [dates[7]]: 6,
        [dates[8]]: 6,
        [dates[9]]: 6
      }
    },
    {
      name: 'Lynhøgen',
      slug: 'lynhøgen',
      number_of_beds: 4,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 4,
        [dates[1]]: 4,
        [dates[2]]: 4,
        [dates[3]]: 4,
        [dates[4]]: 4,
        [dates[5]]: 4,
        [dates[6]]: 4,
        [dates[7]]: 4,
        [dates[8]]: 4,
        [dates[9]]: 4
      }
    },
    {
      name: 'Selbukåten',
      slug: 'selbukåten',
      number_of_beds: 2,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 2,
        [dates[1]]: 2,
        [dates[2]]: 2,
        [dates[3]]: 2,
        [dates[4]]: 2,
        [dates[5]]: 2,
        [dates[6]]: 2,
        [dates[7]]: 2,
        [dates[8]]: 2,
        [dates[9]]: 2
      }
    },
    {
      name: 'Holvassgamma',
      slug: 'holvassgamma',
      number_of_beds: 8,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 8,
        [dates[1]]: 8,
        [dates[2]]: 8,
        [dates[3]]: 8,
        [dates[4]]: 8,
        [dates[5]]: 8,
        [dates[6]]: 8,
        [dates[7]]: 8,
        [dates[8]]: 8,
        [dates[9]]: 8
      }
    },
    {
      name: 'Kamtjønnkoia',
      slug: 'kamtjønnkoia',
      number_of_beds: 6,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 6,
        [dates[1]]: 6,
        [dates[2]]: 6,
        [dates[3]]: 6,
        [dates[4]]: 6,
        [dates[5]]: 6,
        [dates[6]]: 6,
        [dates[7]]: 6,
        [dates[8]]: 6,
        [dates[9]]: 6
      }
    },
    {
      name: 'Rindalsløa',
      slug: 'rindalsløa',
      number_of_beds: 4,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 4,
        [dates[1]]: 4,
        [dates[2]]: 4,
        [dates[3]]: 4,
        [dates[4]]: 4,
        [dates[5]]: 4,
        [dates[6]]: 4,
        [dates[7]]: 4,
        [dates[8]]: 4,
        [dates[9]]: 4
      }
    },
    {
      name: 'Iglbu',
      slug: 'iglbu',
      number_of_beds: 10,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 10,
        [dates[1]]: 10,
        [dates[2]]: 10,
        [dates[3]]: 10,
        [dates[4]]: 10,
        [dates[5]]: 10,
        [dates[6]]: 10,
        [dates[7]]: 10,
        [dates[8]]: 10,
        [dates[9]]: 10
      }
    },
    {
      name: 'Mortenskåten',
      slug: 'mortenskåten',
      number_of_beds: 2,
      booking_window: 14,
      beds_available_in_date_range: {
        [dates[0]]: 2,
        [dates[1]]: 2,
        [dates[2]]: 2,
        [dates[3]]: 2,
        [dates[4]]: 2,
        [dates[5]]: 2,
        [dates[6]]: 2,
        [dates[7]]: 2,
        [dates[8]]: 2,
        [dates[9]]: 2
      }
    }
  ];
}
