import { CommonProvider } from '@/context/commonContext';
import { Button } from 'antd';
import React, { lazy, Suspense, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
// import TabsContent from './components/TabsContent';
// 使用 React.lazy 动态导入组件
const TabsContent = lazy(() => import('./components/TabsContent'));

const TabsPage: React.FC = () => {
  const ref = useRef<any>();
  // const [count, setCount] = useState(2);
  const [data, setData] = useState({ count: 2 });

  const handle = () => {
    flushSync(() => {
      // setCount(3);
      setData({ count: 3 });
      console.log(data, '=========data 2222');
      setTimeout(() => {
        // setCount(count * 2);
        setData({ count: data.count * 2 });
        // console.log(count, '=====count timeout666');
        console.log(data, '=====data timeout666');
      }, 0);
      queueMicrotask(() => {
        // setCount(count * 2);
        setData({ count: data.count * 2 });
        // console.log(count, '=====count queueMicrotask333');
        console.log(data, '=====data queueMicrotask333');
      });
    });
    // 这里的代码执行时，DOM 已经真实刷新完成，可以立即读取最新的 DOM 状态
    console.log(
      document.getElementById('myDiv')?.offsetWidth,
      '=====offsetWidth222',
    );
    // setCount(count * 2);
    // setCount(count * 3);
    setData({ count: data.count * 2 });
    setData({ count: data.count * 3 });
    setTimeout(() => {
      // setCount((count) => count * 2);
      // setCount((count) => count * 3);
      setData((data) => ({
        count: data.count * 2,
      }));
      setData((data) => ({
        count: data.count * 3,
      }));
      // console.log(count, '=====count timeout777');
      console.log(data, '=====data timeout777');
    }, 0);
    Promise.resolve().then(() => {
      // setCount(count * 4);
      setData({ count: data.count * 4 });
      // console.log(count, '=====count promise resolve444');
      console.log(data, '=====data promise resolve444');
    });
    queueMicrotask(() => {
      // setCount(count * 6);
      setData({ count: data.count * 6 });
      // console.log(count, '=====count queueMicrotask555');
      console.log(data, '=====data queueMicrotask555');
    });
  };

  // console.log(count, '=======count 4444');
  console.log(data, '=======data 4444');

  queueMicrotask(() => {
    // 这里的代码会在当前同步任务结束后、页面渲染前立即执行等价与Promise.resolve().then
    console.log('微任务执行完毕');
  });

  Promise.resolve().then(() => {
    // 这里的代码会在当前同步任务结束后、页面渲染前立即执行
    console.log('promise resolve');
  });

  return (
    <CommonProvider>
      <Suspense fallback={<div className="p-4">正在加载...</div>}>
        <TabsContent ref={ref} />
      </Suspense>

      <div id="myDiv">
        <Button
          onClick={() => {
            ref.current.create();
          }}
        >
          test
        </Button>
      </div>

      <div>
        <Button onClick={handle}>handle</Button>
      </div>
    </CommonProvider>
  );
};

export default TabsPage;
