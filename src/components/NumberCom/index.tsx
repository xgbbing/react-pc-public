import { useNumber } from '@/models/number-context';
import { Button, Space } from 'antd';
import React from 'react';

const NumberCom: React.FC = () => {
  const { number, add, substract } = useNumber();
  return (
    <div>
      <Space>
        <div>useContext: number: {number}</div>
        <Button onClick={add}>增加1</Button>
        <Button onClick={substract}>减少1</Button>
      </Space>
    </div>
  );
};

export default NumberCom;
