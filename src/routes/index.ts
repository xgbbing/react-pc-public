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
        component: './TabCache',
      },
      {
        name: '测试页面',
        path: '/test/test-page',
        component: './TestPage',
      },
      {
        name: 'Reducer示例',
        path: '/test/tabs',
        component: './TabsPage',
      },
    ],
  },
];
