export default interface AdminReport {
  timestamp: string;
  id: number;
  slug: string;
  trip_date: string;
  booking_id: number;
  gas_is_full: number;
  firewood: number;
  chopped_up_wood: number;
  boat_status: number;
  canoe_status: number;
  life_jackets_status: number;
  smoke_detector_is_working: number;
  equipment_ok: Array<string>;
  equipment_not_ok: Array<string>;
  equipment_not_sure: Array<string>;
  other_faults: string;
  feedback: string;
}
