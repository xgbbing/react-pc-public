// 运行时配置
import HeaderCity from '@/components/HeaderCity';
import { useModel, RunTimeLayoutConfig } from '@umijs/max';

import logo from '@/assets/logo.png';
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
const log_api = process.env.LOG_API;

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

// monitor.install();

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Alice.Xu' };
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
      // await logout();
      window.location.reload();
    },
  };
};
