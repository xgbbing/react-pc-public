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
              name="app1-embed"
              url="/app1/"
              autoSetLoading
            />
          </div>
          <div key="app2">
            <MicroAppWithMemoHistory
              name="app2-embed"
              url="/app2/"
              autoSetLoading
            />
          </div>
        </KeepAlive>
      </div>
    </PageContainer>
  );
};

export default TabCache;
