import store from '@/store';
import axios from 'axios';
import Vue from 'vue';
import { Tokens } from '@/store/types';
import dayjs from 'dayjs';
import { refreshToken } from '@/service/auth';

function buildUrl(url: string) {
  return url
    .toLowerCase()
    .split(' ')
    .join('-');
}

function checkIfTokenHasExpired(tokens: Tokens): boolean {
  return (
    dayjs()
      .subtract(30, 'second')
      .unix() > (tokens.expires || 0)
  );
}

function checkIfUserHasToken(tokens: Tokens): boolean {
  return tokens.expires !== 0 && tokens.expires !== null;
}

export default async function request(options: any): Promise<any> {
  const headers = {
    ...options.headers,
  };

  if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') {
    headers['content-type'] = 'application/json';
  }
  let tokens = store.state.auth.tokens;
  if (checkIfUserHasToken(tokens) && checkIfTokenHasExpired(tokens)) {
    try {
      // In order to make sure we don't refresh the token again while we call 'refresh token',
      // we set the token to expire tomorrow
      const tomorrow = dayjs()
        .add(1, 'day')
        .unix();
      store.commit('auth/setTokenExpires', tomorrow);
      await refreshToken();
      tokens = store.state.auth.tokens;
    } catch (e) {
      console.error(e);
    }
  }

  if (tokens.access) {
    headers.Authorization = `Bearer ${tokens.access}`;
  }
  const url = Vue.prototype.$apiUrl + buildUrl(options.url);
  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      headers,
      params: options.params,
      data: options.data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
