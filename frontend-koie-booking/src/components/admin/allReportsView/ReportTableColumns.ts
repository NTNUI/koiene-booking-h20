import { ColorAndText, ReportColumn } from '@/types/admin/ReportColumn';
import scssVars from '@/styles/variables.scss';

const red = scssVars.globalColorRedStrong;
const orange = scssVars.globalColorRedWeak;
const yellow = scssVars.globalColorYellow;
const lightGreen = scssVars.globalColorGreenWeak;
const green = scssVars.globalColorGreenStrong;
const grey = scssVars.globalColorGrey;

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

const lifeJacketOptions = boatOptions.splice(1, 1);

const reportTableColumns: { [value: string]: ReportColumn } = {
  timestamp: {
    text: 'Tidsmerke',
    align: 'center',
    sortable: true,
    value: 'timestamp',
  },
  slug: {
    text: 'Koie',
    align: 'center',
    sortable: true,
    value: 'slug',
  },
  trip_date: {
    text: 'Turdato',
    align: 'center',
    sortable: true,
    value: 'trip_date',
  },
  gas_is_full: {
    text: 'Gassbestand',
    align: 'center',
    sortable: true,
    value: 'gas_is_full',
    colorAndTextOptions: [
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
  firewood: {
    text: 'Vedstokker',
    align: 'center',
    sortable: true,
    value: 'firewood',
    colorAndTextOptions: woodOptions,
  },
  chopped_up_wood: {
    text: 'Opphuggd ved',
    align: 'center',
    sortable: true,
    value: 'chopped_up_wood',
    colorAndTextOptions: woodOptions,
  },
  boat_status: {
    text: 'Båt',
    align: 'center',
    sortable: true,
    value: 'boat_status',
    colorAndTextOptions: boatOptions,
  },
  canoe_status: {
    text: 'Kano',
    align: 'center',
    sortable: true,
    value: 'canoe_status',
    colorAndTextOptions: boatOptions,
  },
  life_jackets_status: {
    text: 'Redningsvest',
    align: 'center',
    sortable: true,
    value: 'life_jackets_status',
    colorAndTextOptions: lifeJacketOptions,
  },
  smoke_detector_is_working: {
    text: 'Røykvarsler',
    align: 'center',
    sortable: true,
    value: 'smoke_detector_is_working',
    colorAndTextOptions: [
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
  other_faults: {
    text: 'Andre utstyrsfeil',
    align: 'center',
    sortable: false,
    value: 'other_faults',
    colorAndTextOptions: [],
  },
  feedback: {
    text: 'Tilbakemelding',
    align: 'center',
    sortable: false,
    value: 'feedback',
  },
};

export default reportTableColumns;
