export const routes = [
  {
    name: '首页',
    path: '/',
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
        path: '/test/app1',
      },
      {
        path: 'test/app1/*',
        microApp: 'app1',
        hideInMenu: true,
      },
      {
        name: 'app2',
        path: '/test/app2',
      },
      {
        path: '/test/app2/*',
        microApp: 'app2',
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
