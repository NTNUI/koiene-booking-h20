export default interface AdminBooking {
  name: string;
  slug: string;
  numberOfBeds: number;
  bedsAvailableInDateRange: { [date: string]: number };
}

export type AdminBookingDictionary = { [slug: string]: AdminBooking };
