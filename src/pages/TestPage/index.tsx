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
              url="/react-pc-app2/home"
              autoSetLoading
              city={city}
              setCity={setCity}
            />
          )}
        </Drawer>
      </div>
    </PageContainer>
  );
};

export default TestPage;
