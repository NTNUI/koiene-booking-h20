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

export const reportTableColumns: { [value: string]: ReportColumn } = {
  gasIsFull: {
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
    colorAndTextOptions: woodOptions,
  },
  choppedUpWood: {
    colorAndTextOptions: woodOptions,
  },
  boatStatus: {
    colorAndTextOptions: boatOptions,
  },
  canoeStatus: {
    colorAndTextOptions: boatOptions,
  },
  lifeJacketsStatus: {
    colorAndTextOptions: lifeJacketOptions,
  },
  smokeDetectorIsWorking: {
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
};
