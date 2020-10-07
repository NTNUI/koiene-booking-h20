export default interface AdminBooking {
  name: string;
  slug: string;
  numberOfBeds: number;
  bedsAvailableInDateRange: { [date: string]: number };
}

export interface APIAdminBooking {
  name: string;
  slug: string;
  number_of_beds: number;
  beds_available_in_date_range: { [date: string]: number };
  booking_window: number;
}

export type AdminBookingDictionary = { [slug: string]: AdminBooking };
