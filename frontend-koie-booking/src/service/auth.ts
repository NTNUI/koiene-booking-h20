import request from '@/service/request';
import store from '@/store';
import { TokenPayload } from '@/types/tokenPayload';
import axios from 'axios';

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

export async function verifyToken() {
  const token = await store.getters['auth/getToken'];
  if (!token) return;

  try {
    await request({
      method: 'POST',
      url: `/token/verify/`,
      data: { token },
    });
  } catch (error) {
    axios.defaults.headers.common['Authorization'] = null;
    await store.dispatch('auth/deleteTokens');
  }
}

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('r');
    if (!refreshToken) return;
    const data = await request({
      method: 'POST',
      url: `/token/refresh/`,
      data: { refresh: refreshToken },
    });
    await store.dispatch('auth/refreshToken', data);
    return data;
  } catch (error) {
    store.dispatch('auth/deleteTokens');
    throw error;
  }
}
