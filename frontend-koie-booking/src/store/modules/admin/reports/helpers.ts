import { APIAdminBooking } from '@/types/admin/AdminBooking';
import { KoieNameSlug } from '@/types/admin/AdminReports';
import APIAdminReport from '@/types/admin/APIAdminReport';
import AdminReport from '@/types/admin/AdminReport';

export function convertAPIBookingToKoieNameSlug(APIBooking: APIAdminBooking): KoieNameSlug {
  return {
    name: APIBooking.name,
    slug: APIBooking.slug,
  };
}

export function convertAPIReportToAdminReport(APIReport: APIAdminReport): AdminReport {
  return {
    timestamp: APIReport.timestamp,
    id: APIReport.id,
    slug: APIReport.slug,
    tripDate: APIReport.trip_date,
    bookingId: APIReport.booking_id,
    gasIsFull: APIReport.gas_is_full ? 1 : 0,
    firewood: APIReport.firewood,
    choppedUpWood: APIReport.chopped_up_wood,
    boatStatus: APIReport.boat_status,
    canoeStatus: APIReport.canoe_status,
    lifeJacketsStatus: APIReport.life_jackets_status,
    smokeDetectorIsWorking: APIReport.smoke_detector_is_working ? 1 : 0,
    equipmentOk: APIReport.equipment_ok,
    equipmentNotOk: APIReport.equipment_not_ok,
    equipmentNotSure: APIReport.equipment_not_sure,
    otherFaults: APIReport.other_faults,
    feedback: APIReport.feedback,
  };
}
