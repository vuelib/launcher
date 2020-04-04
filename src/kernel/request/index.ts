import Axios, { AxiosInstance } from 'axios';
import { LocalStorage } from '@kernel-js/storage';
import { get, isEmpty } from 'lodash';
declare module 'vue/types/vue' {
  interface Vue {
    $request: AxiosInstance;
  }
}

const storage = new LocalStorage();
const token = get(storage.get('auth'), 'access_token', null);

const headers: any = {
  'App-Id': '7d04acde-118b-4a87-abde-af7d5a15d14f',
  'Content-Type': 'application/json',
};

if (!isEmpty(token)) {
  headers['Authorization'] = `Bearer ${token}`;
}

/**
 *
 * @param {string} baseUrl
 * @returns {string}
 */
function getEnvironmentUrl(baseUrl: string): string {
  const appEnv = process.env.ENVIRONMENT;

  if (appEnv === 'production') {
    return baseUrl;
  }

  baseUrl = baseUrl.replace('.platafoor', `-staging.platafoor`);
  baseUrl = baseUrl.replace('.popcartao', `-staging.popcartao`);

  return baseUrl;
}

export default {
  install(Vue: any) {
    Vue.prototype.$request = Axios.create({
      baseURL: getEnvironmentUrl('https://auth.platafoor.com'),
      headers: headers,
    });
  },
};
