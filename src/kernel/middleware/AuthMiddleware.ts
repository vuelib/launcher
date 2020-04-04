import Vue from 'vue';

export default function auth({ next }: any) {
  if (Vue.prototype.$auth.isGuest()) {
    next('/login');
  } else {
    next();
  }
}
