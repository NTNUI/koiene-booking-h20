import { MutationTree } from 'vuex';
import { ReportState } from '../../../types';

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
  setGasStatus(state, status: number) {
    state.gasStatus = status;
  }
};
