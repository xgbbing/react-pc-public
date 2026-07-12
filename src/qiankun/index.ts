// 路由模式子应用配置
const microApps = [
  {
    name: 'react-pc-app1',
    entry: 'https://xgbbing.win/webapp/react-pc-app1/',
    // entry: 'http://localhost:8000/webapp/react-pc-app1/',
  },
  {
    name: 'react-pc-app2',
    entry: 'https://xgbbing.win/app2/',
    // entry: 'http://localhost:8001/app2/',
  },
];

// 组件模式子应用配置
const embedApps = microApps.map((app) => ({
  name: `${app.name}-embed`,
  entry: app.entry,
}));

export const apps = [...microApps, ...embedApps];
