// rootState = generic type, defines the root state type
import AdminBooking, { AdminBookingDictionary } from '@/types/admin/AdminBooking';
import { AdminReportKoieDictionary } from '@/types/admin/AdminReports';

export interface RootState {
  version: string;
  koie: KoieState;
  booking: BookingState;
  auth: AuthState;
  avalanche: AvalancheState;
  adminBookings: AdminBookingsState;
}

export interface KoieState {
  currentLocale: string;
  isLoading: boolean;
  koieData: Koie;
  error: boolean;
  allKoier: [];
}

export interface Koie {
  location: {
    latitude: string;
    longitude: string;
    area: string;
    difficultyInfo_eng: string;
    difficultyInfo_nor: string;
    altitude: number;
    terrain_eng: string;
    terrain_nor: string;
    map_pdf: string;
    kartblad: string;
  };
  description: {
    yr_link_eng: string;
    yr_link_nor: string;
    description_eng: string;
    description_nor: string;
    directions_eng: string;
    directions_nor: string;
    parking_eng: string;
    parking_nor: string;
  };
  beds_available_in_booking_window: Array<BedsAvailable>;
  name: string;
  number_of_beds: number;
  booking_window: number;
  price_member: number;
  price_not_member: number;
}

export interface BedsAvailable {
  date: string;
  bedsAvailable: number;
}

export interface BookingState {
  isLoading: boolean;
  dateFrom: string;
  dateTo: string;
  beds: number;
  step: number;
  guests: Array<Guest>;
  numberOfMembers: number;
  numberOfNonMembers: number;
  edited: boolean;
  validForm: boolean;
  unavailableDates: [];
  availableBeds: number;
  noDatesAvailable: boolean;
  error: boolean;
  bookingData: BookingInfo;
  paymentConfirmed: boolean;
}

export interface ReportState {
  validForm: boolean;
  edited: boolean;
  isLoading: boolean;
  error: boolean;
  step: number;
  reportData: ReportData;
  bookingInfo: BookingInfo;
}

export interface ReportData {
  id: number;
  booking_uuid: string;
  firewood: number;
  chopped_up_wood: number;
  smoke_detector_is_working: boolean;
  gas_is_full: boolean;
  gas_burner_primus: number;
  axe: number;
  hammer: number;
  saw: number;
  saw_blade: number;
  saw_bench: number;
  spade: number;
  kerosene_lamp: number;
  detergent: number;
  dishware: number;
  cookware: number;
  cabin_book: number;
  candle_holders: number;
  fire_blanket: number;
  fire_extinguisher: number;
  other_faults: string;
  boat_status: number;
  canoe_status: number;
  life_jackets_status: number;
  feedback: string;
}

export interface AvalancheState {
  warningLevels: Array<Warning>;
  disableBooking: boolean;
  warningData: Array<WarningResult>;
  koierToCheck: Array<string>;
}

export interface Warning {
  day: string;
  level: number;
}

export interface WarningResult {
  dangerLevel: number;
  validTo: string;
}

export interface CreateBookingInfo {
  koie: string;
  from_date: string;
  to_date: string;
  guests: Array<Guest>;
  guests_member: number;
  guests_not_member: number;
}

export interface BookingInfo {
  id: number;
  uuid: string;
  user: number;
  koie: string;
  price: number;
  booking_transaction_id: string;
  from_date: string;
  to_date: string;
  guests_member: number;
  guests_not_member: number;
}

export interface AuthState {
  isAdmin: boolean;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
}

export interface Guest {
  name: string;
  number: string;
  email: string;
  isMember: boolean;
}

export interface AdminBookingsState {
  cabinsWithBookings: AdminBookingDictionary;
  startDate: string;
}

export interface AdminReportsState {
  chosenCabin: string;
  expanded: boolean;
  cabins: AdminReportKoieDictionary;
}
