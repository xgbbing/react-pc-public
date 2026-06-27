import { CommonProvider } from '@/context/commonContext';
import { Button } from 'antd';
import { useRef } from 'react';
import TabsContent from './components/TabsContent';

const TabsPage: React.FC = () => {
  const ref = useRef<any>();

  return (
    <CommonProvider>
      <TabsContent ref={ref} />
      <Button
        onClick={() => {
          ref.current.create();
        }}
      >
        test
      </Button>
    </CommonProvider>
  );
};

export default TabsPage;
