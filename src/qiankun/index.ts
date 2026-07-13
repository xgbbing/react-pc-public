// 路由模式子应用配置
const microApps = [
  {
    name: 'react-pc-app1',
    entry: '/webapp/react-pc-app1/',
  },
  {
    name: 'react-pc-app2',
    entry: '/webapp/react-pc-app2/',
  },
];

// 组件模式子应用配置
const embedApps = microApps.map((app) => ({
  name: `${app.name}-embed`,
  entry: app.entry,
}));

export const apps = [...microApps, ...embedApps];
