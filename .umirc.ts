import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'React PC Public',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: 'app1',
      path: '/react-pc-app',
      redirect: '/react-pc-app/home',
    },
    {
      path: '/react-pc-app/*',
      microApp: 'react-pc-app',
      hideInMenu: true,
    },
  ],
  npmClient: 'pnpm',
  // utoopack: {},
  qiankun: {
    master: {
      apps: [
        {
          name: 'react-pc-app',
          entry: '//localhost:8000',
        },
      ],
    },
  },
});
