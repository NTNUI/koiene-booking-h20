import store from '@/store';
import axios from 'axios';
import Vue from 'vue';

function buildUrl(url: string) {
  return url
    .toLowerCase()
    .split(' ')
    .join('-');
}

export default async function request(options: any): Promise<any> {
  const headers = {
    ...options.headers,
  };

  if (options.method === 'POST' || options.method === 'PUT') {
    headers['content-type'] = 'application/json';
  }
  const authToken = await store.getters['auth/getToken'];
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
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
