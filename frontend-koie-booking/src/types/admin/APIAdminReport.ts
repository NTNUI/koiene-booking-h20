export default interface APIAdminReport {
  date_created_at: string;
  id: number;
  koie_name: string;
  date_of_stay: string;
  gas_is_full: boolean;
  firewood: number;
  chopped_up_wood: number;
  boat_status: number;
  canoe_status: number;
  life_jackets_status: number;
  smoke_detector_is_working: boolean;
  equipment_status: Array<Array<string>>;
  other_faults: string;
  feedback: string;
}
