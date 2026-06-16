import { defineConfig } from '@umijs/max';
import { apps } from './src/qiankun';
import { routes } from './src/routes';

export default defineConfig({
  favicons: ['logo.png'],
  define: { 'process.env.LOG_API': process.env.LOG_API },
  antd: {
    // dark: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Alice.Xu',
  },
  routes,
  npmClient: 'pnpm',
  // utoopack: {},
  qiankun: {
    master: {
      apps,
    },
  },
  proxy: {
    '/api': {
      target: 'https://xgbbing.win/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
