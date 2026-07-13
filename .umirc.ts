import { defineConfig } from '@umijs/max';
import {
  PROXY_API_URL,
  PROXY_URL_APP1,
  PROXY_URL_APP2,
  PROXY_URL_DOCS,
} from './src/constants';
import { apps } from './src/qiankun';
import { routes } from './src/routes';

export default defineConfig({
  favicons: ['logo.png'],
  define: {},
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
  hash: true,
  // utoopack: {},
  headScripts: [],
  qiankun: {
    master: {
      apps,
      autoSetLoading: true,
      // 开启样式隔离
      sandbox: {
        // strictStyleIsolation: true, // 方案 A：Shadow DOM 隔离（最彻底）
        experimentalStyleIsolation: true, // 方案 B：Scoped CSS（兼容性更好）
      },
      prefetch: 'all', // 空闲时预加载子应用资源
    },
  },
  proxy: {
    '/api/': {
      target: PROXY_API_URL,
      changeOrigin: true,
      secure: true,
    },
    '/docs/': {
      target: PROXY_URL_DOCS,
      changeOrigin: true,
      secure: true,
    },
    '/webapp/react-pc-app1/': {
      target: PROXY_URL_APP1,
      changeOrigin: true,
      secure: true,
    },
    '/webapp/react-pc-app2/': {
      target: PROXY_URL_APP2,
      changeOrigin: true,
      secure: true,
    },
  },
});
