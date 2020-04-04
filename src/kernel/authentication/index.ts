import { StorageMethods, OAuthAuthentication } from '@kernel-js/auth';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: OAuthAuthentication;
  }
}

export default {
  install(Vue: any) {
    Vue.prototype.$auth = new OAuthAuthentication({
      request: Vue.prototype.$request,
      storage: {
        method: StorageMethods.LocalStorage,
      },
      client: {
        id: '2',
        scope: '*',
        secret: '2gv8fBxRu6ptF4kCcEvnuyc0u8YjuN3btflw1hup',
      },
    });
  },
};
