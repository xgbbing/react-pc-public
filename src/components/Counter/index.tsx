import CounterContainer from '@/models/counter-container';
import { Button, Space } from 'antd';
import React from 'react';

const Counter: React.FC = () => {
  const { count, increment, decrement } = CounterContainer.useContainer();
  return (
    <div>
      <Space>
        <div>useContainer: count: {count}</div>
        <Button onClick={increment}>增加1</Button>
        <Button onClick={decrement}>减少1</Button>
      </Space>
    </div>
  );
};

export default Counter;
