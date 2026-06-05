// 运行时配置
import HeaderCity from '@/components/HeaderCity';
import { useModel } from '@umijs/max';
import {
  ApiPlugin,
  JsErrorPlugin,
  Monitor,
  PVPlugin,
  PerformancePlugin,
  ResourceErrorPlugin,
} from 'auto-log-sdk';

// 初始化前端监控 SDK
const monitor = new Monitor({
  appId: 'react-pc-public',
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
  return { name: 'xgb' };
}

export function useQiankunStateForSlave() {
  const globalModel = useModel('global');
  return {
    city: globalModel.city,
    setCity: globalModel.setCity,
  };
}
export const layout = () => {
  return {
    title: 'React PC Public',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
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
  };
};
