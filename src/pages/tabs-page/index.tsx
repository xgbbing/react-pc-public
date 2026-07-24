import { CommonProvider } from '@/context/commonContext';
import { App, Button, Space, Table, TablePaginationConfig } from 'antd';
import React, { lazy, Suspense, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { flushSync } from 'react-dom';
// import TabsContent from './components/TabsContent';
// 使用 React.lazy 动态导入组件
const TabsContent = lazy(() => import('./components/TabsContent'));
const TabsPage: React.FC = () => {
  const ref = useRef<any>();
  // const [count, setCount] = useState(2);
  const [data, setData] = useState({ count: 2 });

  const { message } = App.useApp();
  const text = 'Hello, world!';
  const onCopy = () => {
    message.success('复制成功');
  };
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

  const [pageConfig, setPageConfig] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'age', dataIndex: 'age', key: 'age' },
  ];

  const tableData = [
    {
      name: 'name1',
      age: 1,
      key: '1',
    },
    {
      name: 'name2',
      age: 2,
      key: '2',
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination, '========page');
    setPageConfig(pagination);
  };

  const wsRef = useRef<WebSocket | null>(null);

  const openWebsocket = () => {
    const ws = new WebSocket('ws://localhost:8080/ws');
    wsRef.current = ws;
    ws.onopen = () => {
      console.log('WebSocket 已连接');
      ws.send('hello');
    };
    ws.onmessage = (event) => {
      console.log('收到服务器消息：', event.data);
    };
    ws.onclose = () => {
      console.log('WebSocket 已关闭');
    };
    ws.onerror = (error) => {
      console.error('WebSocket 错误：', error);
    };
  };

  const closeWebsocket = () => {
    if (wsRef.current) wsRef.current.close();
  };

  return (
    <CommonProvider>
      <Suspense fallback={<div className="p-4">正在加载...</div>}>
        <TabsContent ref={ref} />
      </Suspense>

      <Space>
        <div>
          <CopyToClipboard text={text} onCopy={onCopy}>
            <Button>复制</Button>
          </CopyToClipboard>
        </div>
        <Button onClick={handle}>handle</Button>
        <div id="myDiv">
          <Button
            onClick={() => {
              ref.current.create();
            }}
          >
            test
          </Button>
        </div>
        <Button onClick={openWebsocket} type="primary">
          连接websocket
        </Button>
        <Button onClick={closeWebsocket} type="primary">
          关闭websocket
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={pageConfig}
        onChange={handleTableChange}
      />
    </CommonProvider>
  );
};

export default TabsPage;
