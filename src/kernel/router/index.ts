import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../../views/Home.vue';
import AuthMiddleware from '../middleware/AuthMiddleware';

Vue.use(VueRouter);

declare module 'vue/types/vue' {
  interface Vue {
    $vueRouter: VueRouter;
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      middleware: [AuthMiddleware],
    },
    component: Home,
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

Vue.prototype.$vueRouter = router;

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context: any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) {
    return context.next;
  }

  return (...parameters: any) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware,
    });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = { from, next, router, to };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({
      ...context,
      next: nextMiddleware,
    });
  }

  return next();
});

export default router;