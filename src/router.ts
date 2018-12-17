import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('./views/Student.vue'),
    },
    {
      path: '/base',
      meta: {
        title: 'base',
        requiresAuth: true,
      },
      component: () => import('./views/sys/base.vue'),
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('./views/sys/welcome.vue'),
          meta: {
            title: 'welcome',
          },
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('./views/sys/user.vue'),
          meta: {
            title: 'user',
          },
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('./views/sys/role.vue'),
          meta: {
            title: 'role',
          },
        },
      ],
    },
  ],
});
