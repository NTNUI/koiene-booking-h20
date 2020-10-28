import AdminReport from '@/types/admin/APIAdminReport';

export default function getReportData(): Array<AdminReport> {
  const res = new Array<AdminReport>();
  for (let i = 0; i < 10; i++) {
    res.push(getReport());
  }
  return res;
}

export function getReport(): AdminReport {
  return {
    date_created_at: '2020-10-10',
    id: 0,
    koie_name: 'Flåkoia',
    date_of_stay: '2020-08-10',
    gas_is_full: false,
    firewood: 1,
    chopped_up_wood: 3,
    boat_status: 2,
    canoe_status: 1,
    life_jackets_status: 0,
    smoke_detector_is_working: false,
    equipment_status: [
      ['axe', 'hammer', 'kerosene_lamp', 'cabin_book'],
      ['saw', 'saw_blade', 'spade', 'cookware'],
      [
        'gas_burner_primus',
        'saw_bench',
        'detergent',
        'dishware',
        'candle_holders',
        'fire_blanket',
        'fire_extinguisher',
      ],
    ],
    other_faults: 'The cabin was missing',
    feedback: 'Next time make sure the cabin is there',
  };
}
