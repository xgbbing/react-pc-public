// 路由模式子应用配置
const microApps = [
  {
    name: 'app1',
    entry: 'https://xgbbing.win/app1',
  },
  {
    name: 'app2',
    entry: 'https://xgbbing.win/app2',
  },
];

// 组件模式子应用配置
const embedApps = microApps.map((app) => ({
  name: `${app.name}-embed`,
  entry: app.entry,
}));

export const apps = [...microApps, ...embedApps];
