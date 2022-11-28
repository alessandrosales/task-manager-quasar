import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/dashboards/MainPage.vue'),
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('pages/tasks/ListPage.vue'),
      },
      {
        path: 'task/:id?',
        name: 'task',
        component: () => import('pages/tasks/RecordPage.vue'),
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('pages/tags/ListPage.vue'),
      },
      {
        path: 'tag/:id?',
        name: 'tag',
        component: () => import('pages/tags/RecordPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
