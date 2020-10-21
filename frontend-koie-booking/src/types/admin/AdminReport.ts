export default interface AdminReport {
  timestamp: string;
  id: number;
  slug: string;
  tripDate: string;
  bookingId: number;
  bookingUUId: string;
  gasIsFull: number;
  firewood: number;
  choppedUpWood: number;
  boatStatus: number;
  canoeStatus: number;
  lifeJacketsStatus: number;
  smokeDetectorIsWorking: number;
  equipmentOk: Array<string>;
  equipmentNotOk: Array<string>;
  equipmentNotSure: Array<string>;
  otherFaults: string;
  feedback: string;
  name?: string;
}

export type AdminReportDictionary = { [id: string]: AdminReport };
