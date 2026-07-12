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
  hash: true,
  // utoopack: {},
  headScripts: [],
  qiankun: {
    master: {
      apps,
      // 开启样式隔离
      sandbox: {
        // strictStyleIsolation: true, // 方案 A：Shadow DOM 隔离（最彻底）
        experimentalStyleIsolation: true, // 方案 B：Scoped CSS（兼容性更好）
      },
      prefetch: 'all', // 空闲时预加载子应用资源
    },
  },
  proxy: {
    '/api': {
      target: process.env.PROXY_API_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/docs': {
      target: process.env.PROXY_DOCS_URL,
      changeOrigin: true,
      pathRewrite: { '^/docs': '' },
    },
  },
});
