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
      path: '/react-pc-app1',
      redirect: '/react-pc-app1/home',
    },
    {
      path: '/react-pc-app1/*',
      microApp: 'react-pc-app1',
      hideInMenu: true,
    },
    {
      name: 'app2',
      path: '/react-pc-app2',
      redirect: '/react-pc-app2/home',
    },
    {
      path: '/react-pc-app2/*',
      microApp: 'react-pc-app2',
      hideInMenu: true,
    },
  ],
  npmClient: 'pnpm',
  // utoopack: {},
  qiankun: {
    master: {
      apps: [
        {
          name: 'react-pc-app1',
          entry: '//localhost:8000',
        },
        {
          name: 'react-pc-app2',
          entry: '//localhost:8003',
        },
      ],
    },
  },
});
