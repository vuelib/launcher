import Vue from 'vue';
import request from '../request';
import authentication from '../authentication';

Vue.use(request);
Vue.use(authentication);

export default function auth({ next }: any) {
  if (Vue.prototype.$auth.isAuthenticated()) {
    next('/');
  } else {
    next();
  }
}