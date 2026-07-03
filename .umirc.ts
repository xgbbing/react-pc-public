import { defineConfig } from '@umijs/max';
import { apps } from './src/qiankun';
import { routes } from './src/routes';

export default defineConfig({
  favicons: ['logo.png'],
  define: {
    'process.env': process.env,
  },
  antd: {
    // dark: true,
  },
  clientLoader: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    // title: 'Alice.Xu',
  },
  base: '/',
  publicPath: '/',
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
      target: process.env.PROXY_API_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
