// 运行时配置
import HeaderCity from '@/components/HeaderCity';
import {
  RequestConfig,
  RunTimeLayoutConfig,
  history,
  useModel,
} from '@umijs/max';
import { App, message } from 'antd';

import logo from '@/assets/logo.png';
import { AccountService } from '@/services';
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
import { TOKEN_KEY, USERNAME_KEY } from './constants';

const env = process.env.NODE_ENV;
const log_api = process.env.LOG_API;

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
  return <App>{container}</App>;
}

export function useQiankunStateForSlave() {
  const globalModel = useModel('global');
  return {
    city: globalModel.city,
    setCity: globalModel.setCity,
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
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
      // const url = response.config.url || '';
      // if (url.endsWith('.md')) {
      //   return response;
      // }

      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { data = {} as any } = response;
      if (data.code === 200) return response;
      if (data.code === 401) {
        localStorage.removeItem(TOKEN_KEY); // 清除本地 Token
        localStorage.removeItem(USERNAME_KEY); // 清除本地 username
        history.push('/login');
      }
      return response;
    },
  ],
};
