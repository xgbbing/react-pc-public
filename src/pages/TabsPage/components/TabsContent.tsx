import useStepsInfo from '@/hooks/stepsInfoContext/useStepsInfo';
import { Button, Space } from 'antd';
import React from 'react';

const TabsContent: React.FC = () => {
  const { state, updatedStepsKey } = useStepsInfo();
  return (
    <div>
      <Space>
        <div>当前tab：{state?.key}</div>
        <Button onClick={() => updatedStepsKey({ key: 'tab2' })}>
          切换为tab2
        </Button>
        <Button onClick={() => updatedStepsKey({ key: 'tab1' })}>
          切换为tab1
        </Button>
      </Space>
    </div>
  );
};

export default TabsContent;
