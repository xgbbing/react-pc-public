export const routes = [
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
    name: '登录',
    path: '/login',
    component: './Login',
    layout: false,
    hideInMenu: true,
  },
  {
    name: '测试页面',
    path: '/test',
    component: './TestPage',
    routes: [
      {
        name: '权限演示',
        path: '/test/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/test/table',
        component: './Table',
      },
      {
        name: '无菜单页面',
        path: '/test/no-menu',
        component: './Table',
        layout: false,
      },
      {
        name: 'app1',
        path: '/test/react-pc-app1',
        redirect: '/react-pc-app1/home',
      },
      {
        path: '/test/react-pc-app1/*',
        microApp: 'react-pc-app1',
        hideInMenu: true,
      },
      {
        name: 'app2',
        path: '/test/react-pc-app2',
        redirect: '/react-pc-app2/home',
      },
      {
        path: '/test/react-pc-app2/*',
        microApp: 'react-pc-app2',
        hideInMenu: true,
      },
      {
        name: 'tab切换缓存',
        path: '/test/tab-cache',
        component: './TabCache',
      },
      {
        name: 'Reducer示例',
        path: '/test/tabs',
        component: './TabsPage',
      },
    ],
  },
];
