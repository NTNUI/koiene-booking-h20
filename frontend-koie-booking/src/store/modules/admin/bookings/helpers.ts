import AdminBooking, { APIAdminBooking } from '@/types/admin/AdminBooking';

export function convertAPIBookingToAdminBooking(APIBooking: APIAdminBooking): AdminBooking {
  return {
    name: APIBooking.name,
    bedsAvailableInDateRange: APIBooking.beds_available_in_date_range,
    numberOfBeds: APIBooking.number_of_beds,
    slug: APIBooking.slug,
  };
}
