import useCommonInfo from '@/context/commonContext/useCommonInfo';
import { getUrlParameter } from '@/utils/format';
import { logger } from '@/utils/logger';
import { useDebounceFn, useMemoizedFn, useRequest } from 'ahooks';
import { Button, Space } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const TabsContent = ({}, ref: any) => {
  const { state, updatedStepsKey } = useCommonInfo();

  const [isClient, setIsClient] = useState(false);

  // 使用示例
  const key = getUrlParameter('key');
  logger(key, '====key');

  const { run: runRequest } = useRequest(
    async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 1000);
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        logger(res, '====res');
      },
    },
  );

  const create = useMemoizedFn(() => {
    logger('create function called');
  });

  const { run: runDebounce } = useDebounceFn(() => create(), { wait: 1000 });

  useEffect(() => {
    runDebounce();
    runRequest();
  }, []);

  useImperativeHandle(ref, () => ({
    create,
  }));

  // 确保只在客户端执行依赖 window 的逻辑
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>加载中...</div>; // 服务端渲染时返回占位
  }

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

export default forwardRef(TabsContent);
