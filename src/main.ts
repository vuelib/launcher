import Vue from "vue";
import App from "./App.vue";
import router from "./kernel/router";
// import store from "./store";
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

// Resquest
import Request from './kernel/request';
Vue.use(Request);

// Authentication
import Auth from './kernel/authentication';
Vue.use(Auth);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#launcher',
    render: (r: any) => r(App),
    router,
    // store,
  } 
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
