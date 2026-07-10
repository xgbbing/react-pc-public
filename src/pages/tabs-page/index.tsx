import { CommonProvider } from '@/context/commonContext';
import { Button } from 'antd';
import React, { lazy, Suspense, useRef } from 'react';
// import TabsContent from './components/TabsContent';
// 使用 React.lazy 动态导入组件
const TabsContent = lazy(() => import('./components/TabsContent'));

const TabsPage: React.FC = () => {
  const ref = useRef<any>();

  Promise.resolve().then(() => {
    // 这里的代码会在当前同步任务结束后、页面渲染前立即执行
    console.log('promise resolve');
  });

  queueMicrotask(() => {
    // 这里的代码会在当前同步任务结束后、页面渲染前立即执行
    console.log('微任务执行完毕');
  });

  return (
    <CommonProvider>
      <Suspense fallback={<div className="p-4">正在加载...</div>}>
        <TabsContent ref={ref} />
      </Suspense>

      <div>
        <Button
          onClick={() => {
            ref.current.create();
          }}
        >
          test
        </Button>
      </div>
    </CommonProvider>
  );
};

export default TabsPage;
