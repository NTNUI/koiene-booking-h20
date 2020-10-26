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
    timestamp: APIReport.date_created_at,
    id: APIReport.id,
    slug: APIReport.koie_name,
    tripDate: APIReport.date_of_stay,
    gasIsFull: APIReport.gas_is_full ? 1 : 0,
    firewood: APIReport.firewood,
    choppedUpWood: APIReport.chopped_up_wood,
    boatStatus: APIReport.boat_status,
    canoeStatus: APIReport.canoe_status,
    lifeJacketsStatus: APIReport.life_jackets_status,
    smokeDetectorIsWorking: APIReport.smoke_detector_is_working ? 1 : 0,
    equipmentOk: APIReport.equipment_status[0],
    equipmentNotSure: APIReport.equipment_status[1],
    equipmentNotOk: APIReport.equipment_status[2],
    otherFaults: APIReport.other_faults,
    feedback: APIReport.feedback,
  };
}
