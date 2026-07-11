export const routes = [
  {
    name: '首页',
    path: '/',
    component: './home',
    icon: 'HomeOutlined',
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
    icon: 'SettingOutlined',
    routes: [
      {
        name: '总览',
        path: '/vps-config/all',
        component: './vps-config',
      },
      {
        name: 'DockerCompose容器方案',
        path: '/vps-config/docker-compose',
        component: './vps-config',
      },
      {
        name: 'Linux系统常用命令',
        path: '/vps-config/linux-command',
        component: './vps-config',
      },
      {
        name: '缓存文件清理',
        path: '/vps-config/cache-clear',
        component: './vps-config',
      },
      {
        name: '跨域浏览器开启',
        path: '/vps-config/cross-domain',
        component: './vps-config',
      },
      {
        name: 'SSH密钥登录',
        path: '/vps-config/ssh',
        component: './vps-config',
      },
      {
        name: 'SSH修改端口号',
        path: '/vps-config/ssh-port',
        component: './vps-config',
      },
      {
        name: 'SSH修改密码',
        path: '/vps-config/ssh-password',
        component: './vps-config',
      },
      {
        name: 'V2Ray和vmess',
        path: '/vps-config/v2ray',
        component: './vps-config',
      },
      {
        name: 'VPN速度优化',
        path: '/vps-config/vpn-speed',
        component: './vps-config',
      },
      {
        name: 'XRay-vless-reality',
        path: '/vps-config/xray',
        component: './vps-config',
      },
    ],
  },
  {
    name: '海量数据渲染',
    path: '/heavy-page',
    component: './heavy-page',
    icon: 'FundProjectionScreenOutlined',
  },
  {
    name: '测试页面',
    path: '/test',
    icon: 'CodeOutlined',
    routes: [
      {
        name: '权限演示',
        path: '/test/access',
        component: './access-page',
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
