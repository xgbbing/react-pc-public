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

export const apps = [...microApps, ...embedApps];