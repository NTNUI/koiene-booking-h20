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
  //Trenger vel ikke å ha disse som en egen state? Er vel en del av reportData?
  // setGasIsEmpty(state, isEmpty: boolean) {
  //   state.gasIsFull = isEmpty;
  // },
  // setFirewoodSupply(state, supply: number) {
  //   state.woodSupply = supply;
  // },
  // setChoppedUpWoodSupply(state, supply: number) {
  //   state.woodSupply = supply;
  // },
  setReport(state, report: ReportInfo) {
    state.reportData = report;
  }
};
