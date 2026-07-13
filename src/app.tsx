// 运行时配置
import {
  RequestConfig,
  RunTimeLayoutConfig,
  history,
  useModel,
} from '@umijs/max';
import { App, ConfigProvider, message } from 'antd';

import HeaderCity from '@/components/HeaderCity';
import { PROXY_URL, TOKEN_KEY, USERNAME_KEY } from '@/constants';
import { AccountService } from '@/services';
import { preloadImages } from '@/utils/preload';
import {
  ApiPlugin,
  JsErrorPlugin,
  Monitor,
  PVPlugin,
  PerformancePlugin,
  ResourceErrorPlugin,
  envEnum,
} from 'auto-log-sdk';
import packageJson from '../package.json';

const env = process.env.NODE_ENV;
const log_api = `${PROXY_URL}/api/monitor/log`;
const logo = '/images/logo.png';

window.xgb_env = {
  env,
  log_api,
};

// 初始化前端监控 SDK
const monitor = new Monitor({
  app_id: 'react-pc-public',
  env: env as envEnum,
  biz_version: packageJson.version,
  log_api,
  plugins: [
    [ApiPlugin, {}],
    [ResourceErrorPlugin, {}],
    [JsErrorPlugin, {}],
    [PVPlugin, {}],
    [PerformancePlugin, {}],
  ],
});

monitor.install();

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: localStorage.getItem(USERNAME_KEY) || '访客' };
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider>
      <App>
        {container}
        {/* 核心：将容器放在这里，它们将永远存在于 DOM 中，不会被路由切换销毁 */}
        <div id="root-react-pc-app1" data-qiankun="react-pc-app1"></div>
        <div
          id="root-react-pc-app1-embed"
          data-qiankun="react-pc-app1-embed"
        ></div>
        <div id="root-react-pc-app2" data-qiankun="react-pc-app2"></div>
        <div
          id="root-react-pc-app2-embed"
          data-qiankun="react-pc-app2-embed"
        ></div>
      </App>
    </ConfigProvider>
  );
}

// 微应用共享全局状态
export function useQiankunStateForSlave() {
  const globalModel = useModel('global');
  return {
    city: globalModel.city,
    setCity: globalModel.setCity,
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    token: {
      // 修改内容区域的背景色
      bgLayout: '#fff',
    },
    title: 'Alice.Xu的合集',
    logo: logo,
    locale: 'zh-CN',
    layout: 'mix',
    menu: {
      locale: false,
    },
    rightContentRender: (_: any, dom: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <HeaderCity />
        {dom}
      </div>
    ),
    logout: async () => {
      await AccountService.logout();
      history.push('/login');
    },
    // 监听请求错误并提示
    onPageLoadError: (error: any) => {
      message.error(error?.message || '请求失败，请稍后再试');
    },
    onPageLoad: () => {
      preloadImages();
    },
  };
};

export const request: RequestConfig = {
  timeout: 30000,
  errorConfig: {
    errorHandler(error: any) {
      message.error(error?.message || '请求失败，请稍后再试');
    },
    errorThrower() {},
  },
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`, // 统一添加鉴权头
        };
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    (response) => {
      const url = response.config.url || '';
      // md 文件直接返回
      if (url.endsWith('.md')) {
        return response;
      }

      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { data = {} as any } = response;
      if (data.code === 200) return response;
      if (data.code === 401) {
        localStorage.removeItem(TOKEN_KEY); // 清除本地 Token
        localStorage.removeItem(USERNAME_KEY); // 清除本地 username
        history.push('/login');
      }

      return Promise.reject(data);
    },
  ],
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('[App1] bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('[App1] mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('[App1] unmount', props);
  },
};

// 主应用 src/app.ts
const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  // 过滤并处理微前端相关的网络或加载异常
  if (event.reason?.message?.includes('Failed to fetch')) {
    console.warn('捕获到子应用网络请求异常，已进行全局兜底');
    event.preventDefault(); // 阻止控制台抛出红字报错
  }
};

// 在应用初始化时注册监听
window.addEventListener('unhandledrejection', handleUnhandledRejection);
