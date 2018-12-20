import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const routers = [
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
      {
        path: 'menu',
        name: 'meun',
        component: () => import('./views/sys/menu.vue'),
        meta: {
          title: 'menu',
        },
      },
      {
        path: 'course',
        name: 'course',
        component: () => import('./views/course/course.vue'),
        meta: {
          title: 'course',
        },
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('./views/course/plan.vue'),
        meta: {
          title: 'plan',
        },
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('./views/student/students.vue'),
        meta: {
          title: '学生信息',
        },
      },
      {
        path: 'sch',
        name: 'sch',
        component: () => import('./views/course/sch.vue'),
        meta: {
          title: 'sch',
        },
      },
      {
        path: 'choose',
        name: 'choose',
        component: () => import('./views/course/choose.vue'),
        meta: {
          title: 'choose',
        },
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('./views/student/info.vue'),
        meta: {
          title: 'info',
        },
      },
      {
        path: 'update',
        name: 'update',
        component: () => import('./views/student/update.vue'),
        meta: {
          title: 'update',
        },
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('./views/score/search.vue'),
        meta: {
          title: 'search',
        },
      },
      {
        path: 'upscore',
        name: 'upscore',
        component: () => import('./views/score/upscore.vue'),
        meta: {
          title: 'upscore',
        },
      },
      {
        path: 'searcht',
        name: 'searcht',
        component: () => import('./views/teacher/searcht.vue'),
        meta: {
          title: 'searcht',
        },
      },
      {
        path: 'uptea',
        name: 'uptea',
        component: () => import('./views/teacher/uptea.vue'),
        meta: {
          title: 'uptea',
        },
      },
    ],
  },
];

const routerConfig = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers,
};

// @ts-ignore
const router = new Router(routerConfig);

router.beforeEach((to, from, next) => {

  const token = window.localStorage.getItem('currentUser_token');
  if (to.matched.some((record) => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/',
    });
  }
  next();
});

export default router;
