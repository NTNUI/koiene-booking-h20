import request from '@/service/request';
import store from '@/store';
import { TokenPayload } from '@/types/tokenPayload';
import axios from 'axios';
import router from '@/router';

export async function fetchToken(tokenPayload: TokenPayload) {
  try {
    const data = await request({
      method: 'POST',
      url: `/token/`,
      data: tokenPayload,
    });
    await store.dispatch('auth/obtainToken', data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function verifyToken(token: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    await request({
      method: 'POST',
      url: `/token/verify/`,
      data: { token },
    });
    return true;
  } catch (error) {
    axios.defaults.headers.common['Authorization'] = null;
    return false;
  }
}

export async function refreshToken() {
  try {
    const refreshToken = store.state.auth.tokens.refresh;
    if (!refreshToken) return;
    const data = await request({
      method: 'POST',
      url: `/token/refresh/`,
      data: { refresh: refreshToken },
    });
    await store.dispatch('auth/refreshToken', data);
    return data;
  } catch (error) {
    await store.dispatch('auth/deleteTokens');
  }
}

export async function getTokens() {
  const accessToken = localStorage.getItem('a');

  if (accessToken !== null && (await verifyToken(accessToken))) {
    return {
      access: accessToken,
      refresh: localStorage.getItem('r'),
      expires: Number(localStorage.getItem('t-expires') || '0'),
    };
  } else {
    return {
      access: null,
      refresh: null,
      expires: null,
    };
  }
}
