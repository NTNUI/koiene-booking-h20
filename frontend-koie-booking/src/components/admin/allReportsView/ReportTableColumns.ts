import { ColorAndText, ReportColumn } from '@/types/admin/ReportColumn';

const red = '#F44336';
const orange = '#FF5722';
const yellow = '#FFB300';
const lightGreen = '#C0CA33';
const green = '#4CAF50';
const grey = '#9e9e9e';

const woodOptions: Array<ColorAndText> = [
  {
    color: red,
    text: 'Tomt',
  },
  {
    color: orange,
    text: 'Lite',
  },
  {
    color: yellow,
    text: 'Greit',
  },
  {
    color: lightGreen,
    text: 'En del',
  },
  {
    color: green,
    text: 'Mye',
  },
];

const boatOptions: Array<ColorAndText> = [
  {
    color: red,
    text: 'Mangler',
  },
  {
    color: red,
    text: 'Mangler årer',
  },
  {
    color: red,
    text: 'Defekt',
  },
  {
    color: green,
    text: 'Ok',
  },
  {
    color: grey,
    text: '?',
  },
];

const lifeWestOptions = boatOptions.splice(1, 1);

const reportTableColumns: { [value: string]: ReportColumn } = {
  timestamp: {
    text: 'Tidsmerke',
    align: 'center',
    sortable: true,
    value: 'timestamp',
  },
  koie: {
    text: 'Koie',
    align: 'center',
    sortable: true,
    value: 'koie',
  },
  tripDate: {
    text: 'Turdato',
    align: 'center',
    sortable: true,
    value: 'tripDate',
  },
  gas: {
    text: 'Gassbestand',
    align: 'center',
    sortable: true,
    value: 'gas',
    colorAndText: [
      {
        color: red,
        text: 'Tomt',
      },
      {
        color: green,
        text: 'Fullt',
      },
    ],
  },
  logs: {
    text: 'Vedstokker',
    align: 'center',
    sortable: true,
    value: 'logs',
    colorAndText: woodOptions,
  },
  firewood: {
    text: 'Opphuggd ved',
    align: 'center',
    sortable: true,
    value: 'firewood',
    colorAndText: woodOptions,
  },
  boat: {
    text: 'Båt',
    align: 'center',
    sortable: true,
    value: 'boat',
    colorAndText: boatOptions,
  },
  canoe: {
    text: 'Kano',
    align: 'center',
    sortable: true,
    value: 'canoe',
    colorAndText: boatOptions,
  },
  lifeWest: {
    text: 'Redningsvest',
    align: 'center',
    sortable: true,
    value: 'lifeWest',
    colorAndText: lifeWestOptions,
  },
  smokeDetector: {
    text: 'Røykvarsler',
    align: 'center',
    sortable: true,
    value: 'smokeDetector',
    colorAndText: [
      {
        color: red,
        text: 'Defekt',
      },
      {
        color: green,
        text: 'OK',
      },
    ],
  },
  equipment: {
    text: 'Utstyr',
    align: 'center',
    sortable: false,
    value: 'equipment',
  },
  equipmentNotes: {
    text: 'Andre utstyrsfeil',
    align: 'center',
    sortable: false,
    value: 'equipmentNotes',
  },
  feedback: {
    text: 'Tilbakemelding',
    align: 'center',
    sortable: false,
    value: 'feedback',
  },
};

export default reportTableColumns;
