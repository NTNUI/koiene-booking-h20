import { GetterTree } from 'vuex';
import { AuthState, RootState } from '@/store/types';
import { isLoggedIn } from '@/store/modules/users/auth/helpers';

export const getters: GetterTree<AuthState, RootState> = {
  isAdmin(state): boolean {
    return isLoggedIn(state.tokens.access) && state.isAdmin;
  },
  isLoggedIn(state): boolean {
    return isLoggedIn(state.tokens.access);
  },
  isKeyManager(state): boolean {
    return isLoggedIn(state.tokens.access) && state.isKeyManager;
  },
  getToken(state): string | null {
    const { tokens } = state;
    if (tokens !== undefined && tokens !== null) {
      return tokens.access;
    }
    return '';
  },
};
