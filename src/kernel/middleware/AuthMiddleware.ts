import Vue from 'vue';

export default function auth({ next }: any) {
  console.log(Vue.prototype.$auth.isGuest())
  if (Vue.prototype.$auth.isGuest()) {
    next('/login');
  } else {
    next();
  }
}
