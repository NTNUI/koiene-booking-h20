import TableHeader from '@/types/admin/TableHeader';

const reportTableHeaders: Array<TableHeader> = [
  {
    text: 'Tidsmerke',
    align: 'center',
    sortable: true,
    value: 'timestamp',
  },
  {
    text: 'Koie',
    align: 'center',
    sortable: true,
    value: 'koie',
  },
  {
    text: 'Turdato',
    align: 'center',
    sortable: true,
    value: 'tripDate',
  },
  {
    text: 'Gassbestand',
    align: 'center',
    sortable: true,
    value: 'gas',
  },
  {
    text: 'Vedstokker',
    align: 'center',
    sortable: true,
    value: 'logs',
  },
  {
    text: 'Opphuggd ved',
    align: 'center',
    sortable: true,
    value: 'firewood',
  },
  {
    text: 'Båt',
    align: 'center',
    sortable: true,
    value: 'boat',
  },
  {
    text: 'Kano',
    align: 'center',
    sortable: true,
    value: 'canoe',
  },
  {
    text: 'Redningsvest',
    align: 'center',
    sortable: true,
    value: 'lifeWest',
  },
  {
    text: 'Røykvarsler',
    align: 'center',
    sortable: true,
    value: 'smokeDetector',
  },
  {
    text: 'Utstyr',
    align: 'center',
    sortable: false,
    value: 'equipment',
  },
  {
    text: 'Andre utstyrsfeil',
    align: 'center',
    sortable: false,
    value: 'equipmentNotes',
  },
  {
    text: 'Tilbakemelding',
    align: 'center',
    sortable: false,
    value: 'feedback',
  },
];

export default reportTableHeaders;
