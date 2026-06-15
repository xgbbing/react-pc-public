import { defineConfig } from '@umijs/max';
import { routes } from './src/routes';
import { apps } from './src/qiankun';

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
});
