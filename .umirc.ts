import { defineConfig } from '@umijs/max';

// 路由模式子应用配置
const microApps = [
  {
    name: 'react-pc-app1',
    entry: '//localhost:8000',
  },
  {
    name: 'react-pc-app2',
    entry: '//localhost:8003',
  },
];

// 组件模式子应用配置
const embedApps = microApps.map((app) => ({
  name: `${app.name}-embed`,
  entry: app.entry,
}));

const routes = [
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
    name: '无菜单页面',
    path: '/no-menu',
    component: './Table',
    layout: false,
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
  {
    name: 'tab切换缓存',
    path: '/tab-cache',
    component: './TabCache',
  },
  {
    name: 'Reducer示例',
    path: '/tabs',
    component: './TabsPage',
  },
  {
    name: '测试页面',
    path: '/test',
    component: './TestPage',
  },
];

export default defineConfig({
  favicons: ['logo.png'],
  define: { 'process.env.LOG_API': process.env.LOG_API },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'React PC Public',
  },
  routes,
  npmClient: 'pnpm',
  // utoopack: {},
  qiankun: {
    master: {
      apps: [...microApps, ...embedApps],
    },
  },
});
