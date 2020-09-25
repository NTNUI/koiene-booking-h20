import { MutationTree } from 'vuex';
import { ReportState, ReportInfo } from '../../../types';

export const mutations: MutationTree<ReportState> = {
  setStep(state, step: number) {
    state.step = step;
  },
  setEdited(state, edited: boolean) {
    state.edited = edited;
  },
  setValidForm(state, valid: boolean) {
    state.validForm = valid;
  },
  setLoadingStatus(state, loading: boolean) {
    state.isLoading = loading;
  },
  setError(state, error: boolean) {
    state.error = error;
  },
  setBookingID(state, id: number) {
    state.reportData.booking_id = id;
  },
  setGasIsFull(state, gasIsFull: boolean) {
    state.reportData.gas_is_full = gasIsFull;
  },
  setFirewoodSupply(state, supply: number) {
    state.reportData.firewood = supply;
  },
  setChoppedUpWoodSupply(state, supply: number) {
    state.reportData.chopped_up_wood = supply;
  },
  setSmokeDetectorIsWorking(state, smokeDetectorIsWorking: boolean) {
    state.reportData.smoke_detector_is_working = smokeDetectorIsWorking;
  },
  setGasBurnerPrimus(state, status: number) {
    state.reportData.gas_burner_primus = status;
  },
  setAxe(state, status: number) {
    state.reportData.axe = status;
  },
  setHammer(state, status: number) {
    state.reportData.hammer = status;
  },
  setSaw(state, status: number) {
    state.reportData.saw = status;
  },
  setSawBlade(state, status: number) {
    state.reportData.saw_blade = status;
  },
  setSawBench(state, status: number) {
    state.reportData.saw_bench = status;
  },
  setSpade(state, status: number) {
    state.reportData.spade = status;
  },
  setKeroseneLamp(state, status: number) {
    state.reportData.kerosene_lamp = status;
  },
  setDetergent(state, status: number) {
    state.reportData.detergent = status;
  },
  setDishware(state, status: number) {
    state.reportData.dishware = status;
  },
  setCookware(state, status: number) {
    state.reportData.cookware = status;
  },
  setCabinBook(state, status: number) {
    state.reportData.cabin_book = status;
  },
  setCandleHolders(state, status: number) {
    state.reportData.candle_holders = status;
  },
  setFireBlanket(state, status: number) {
    state.reportData.fire_blanket = status;
  },
  setFireExtinguisher(state, status: number) {
    state.reportData.fire_extinguisher = status;
  },
  setOtherFaults(state, comment: string) {
    state.reportData.other_faults = comment;
  },
  setBoatStatus(state, status: number) {
    state.reportData.boat_status = status;
  },
  setCanoeStatus(state, status: number) {
    state.reportData.canoe_status = status;
  },
  setLifeJacketsStatus(state, status: number) {
    state.reportData.life_jackets_status = status;
  },
  setFeedback(state, feedback: string) {
    state.reportData.feedback = feedback;
  }
};
