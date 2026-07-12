import Counter from '@/components/Counter';
import NumberCom from '@/components/NumberCom';
import CounterContainer from '@/models/counter-container';
import { NumberContext } from '@/models/number-context';
import { PageContainer } from '@ant-design/pro-components';
import { MicroAppWithMemoHistory, useModel, useNavigate } from '@umijs/max';
import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { city, setCity } = useModel('global');
  const [microAppVisible, setMicroAppVisible] = useState(false);
  const [number, setNumber] = useState(10);

  const handleClose = () => {
    setDrawerOpen(false);
    setMicroAppVisible(false);
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Space>
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            侧拉抽屉加载微应用App2
          </Button>
          <Button type="primary" onClick={() => navigate('/no-menu')}>
            无菜单页面
          </Button>
        </Space>
        <div>
          <CounterContainer.Provider initialState={10}>
            <Counter />
          </CounterContainer.Provider>
        </div>
        <div>
          <NumberContext.Provider
            value={{
              number,
              add: () => setNumber(number + 1),
              substract: () => setNumber(number - 1),
            }}
          >
            <NumberCom />
          </NumberContext.Provider>
        </div>
        <Drawer
          title="App2 - Home"
          placement="right"
          width={800}
          closable={false}
          onClose={handleClose}
          open={drawerOpen}
          destroyOnHidden
          afterOpenChange={(open) => {
            if (open) {
              setMicroAppVisible(true);
            }
          }}
        >
          {microAppVisible && (
            <MicroAppWithMemoHistory
              name="react-pc-app2-embed"
              url="/webapp/react-pc-app2/"
              autoSetLoading
              city={city}
              setCity={setCity}
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
          )}
        </Drawer>
      </div>
    </PageContainer>
  );
};

export default TestPage;
