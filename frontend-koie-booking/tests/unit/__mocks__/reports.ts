import AdminReport from '@/types/admin/APIAdminReport';

export default function getReportData(): Array<AdminReport> {
  const res = new Array<AdminReport>();
  for (let i = 0; i < 10; i++) {
    res.push(getReport());
  }
  return res;
}

function getReport(): AdminReport {
  return {
    timestamp: '2020-10-10',
    id: 0,
    slug: 'flakoia',
    trip_date: '2020-08-10',
    booking_uuid: '',
    gas_is_full: false,
    firewood: 1,
    chopped_up_wood: 3,
    boat_status: 2,
    canoe_status: 1,
    life_jackets_status: 0,
    smoke_detector_is_working: false,
    equipment_ok: ['axe', 'hammer', 'kerosene_lamp', 'cabin_book'],
    equipment_not_ok: ['saw', 'saw_blade', 'spade', 'cookware'],
    equipment_not_sure: [
      'gas_burner_primus',
      'saw_bench',
      'detergent',
      'dishware',
      'candle_holders',
      'fire_blanket',
      'fire_extinguisher',
    ],
    other_faults: 'The cabin was missing',
    feedback: 'Next time make sure the cabin is there',
  };
}
