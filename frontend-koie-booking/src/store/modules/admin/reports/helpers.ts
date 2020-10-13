import { APIAdminBooking } from '@/types/admin/AdminBooking';
import { KoieNameSlug } from '@/types/admin/AdminReports';

export function convertAPIBookingToKoieNameSlug(APIBooking: APIAdminBooking): KoieNameSlug {
  return {
    name: APIBooking.name,
    slug: APIBooking.slug,
  };
}
