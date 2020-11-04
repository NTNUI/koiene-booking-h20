import store from '@/store';
import axios from 'axios';
import Vue from 'vue';
import { AuthState, Tokens } from '@/store/types';
import dayjs from 'dayjs';

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

export default async function request(options: any): Promise<any> {
  const headers = {
    ...options.headers,
  };

  if (options.method === 'POST' || options.method === 'PUT') {
    headers['content-type'] = 'application/json';
  }
  let tokens = await store.state.auth.tokens;
  if (checkIfTokenHasExpired(tokens)) {
    try {
      await store.dispatch('auth/refreshToken');
      tokens = await store.state.auth.tokens;
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
