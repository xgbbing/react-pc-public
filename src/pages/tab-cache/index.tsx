import KeepAlive from '@/components/KeepAlive';
import { PageContainer } from '@ant-design/pro-components';
import { MicroAppWithMemoHistory } from '@umijs/max';
import { Tabs } from 'antd';
import React, { useState } from 'react';

const TabCache: React.FC = () => {
  const [activeTab, setActiveTab] = useState('app1');

  const tabItems = [
    { key: 'app1', label: '子应用 App1' },
    { key: 'app2', label: '子应用 App2' },
  ];

  return (
    <PageContainer ghost>
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={setActiveTab}
      ></Tabs>

      <div style={{ height: 'calc(100vh - 200px)' }}>
        <KeepAlive activeKey={activeTab}>
          <div key="app1">
            <MicroAppWithMemoHistory
              name="react-pc-app1-embed"
              url="/webapp/react-pc-app1/"
              autoSetLoading
              // 加载中显示的占位符
              fallback={<div>子应用加载中...</div>}
              // 加载失败或执行报错时展示的降级组件
              error={<div>子应用加载失败，请刷新重试</div>}
              destroy
              data={{
                mode: 'embed',
                containerId: 'root-react-pc-app1-embed',
              }} // 传递嵌入模式标识
            />
          </div>
          <div key="app2">
            <MicroAppWithMemoHistory
              name="react-pc-app2-embed"
              url="/webapp/react-pc-app2/"
              autoSetLoading
              // 加载中显示的占位符
              fallback={<div>子应用加载中...</div>}
              // 加载失败或执行报错时展示的降级组件
              error={<div>子应用加载失败，请刷新重试</div>}
              destroy
              data={{
                mode: 'embed',
                containerId: 'root-react-pc-app2-embed',
              }} // 传递嵌入模式标识
            />
          </div>
        </KeepAlive>
      </div>
    </PageContainer>
  );
};

export default TabCache;
