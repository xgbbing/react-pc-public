export const routes = [
  {
    name: '首页',
    path: '/',
    component: './home',
  },
  {
    name: '登录',
    path: '/login',
    component: './login',
    layout: false,
    hideInMenu: true,
  },
  {
    name: 'VPS配置',
    path: '/vps-config',
    component: './vps-config',
  },
  {
    name: '测试页面',
    path: '/test',
    routes: [
      {
        name: '权限演示',
        path: '/test/access',
        component: './access',
      },
      // {
      //   name: ' CRUD 示例',
      //   path: '/test/table',
      //   component: './Table',
      // },
      // {
      //   name: '无菜单页面',
      //   path: '/test/no-menu',
      //   component: './Table',
      //   layout: false,
      // },
      {
        name: 'app1应用',
        path: '/test/react-pc-app1/*',
        microApp: 'react-pc-app1',
      },

      {
        name: 'app2应用',
        path: '/test/react-pc-app2/*',
        microApp: 'react-pc-app2',
      },
      {
        name: 'tab切换缓存',
        path: '/test/tab-cache',
        component: './tab-cache',
      },
      {
        name: '测试页面',
        path: '/test/test-page',
        component: './test-page',
      },
      {
        name: 'Reducer示例',
        path: '/test/tabs',
        component: './tabs-page',
      },
    ],
  },
];
