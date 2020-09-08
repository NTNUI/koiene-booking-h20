import { GetterTree } from 'vuex';
import { AuthState, RootState } from '@/store/types';

export const getters: GetterTree<AuthState, RootState> = {
  getToken(state): string | null {
    const { tokens } = state;
    if (tokens !== undefined && tokens !== null) {
      return tokens.access;
    }
    return '';
  }
};
