import useCommonInfo from '@/context/commonContext/useCommonInfo';
import { getUrlParameter } from '@/utils/format';
import { useDebounceFn, useMemoizedFn, useRequest } from 'ahooks';
import { App, Button, Space } from 'antd';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const TabsContent = ({}, ref: any) => {
  const { state, updatedStepsKey } = useCommonInfo();
  const text = 'Hello, world!';

  const { message } = App.useApp();

  // 使用示例
  const key = getUrlParameter('key');
  console.log(key);

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
        console.log(res);
      },
    },
  );

  const onCopy = () => {
    message.success('复制成功');
  };

  const create = useMemoizedFn(() => {
    console.log('create');
  });

  const { run: runDebounce } = useDebounceFn(() => create(), { wait: 1000 });

  useEffect(() => {
    runDebounce();
    runRequest();
  }, []);

  useImperativeHandle(ref, () => ({
    create,
  }));

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

      <div>
        <CopyToClipboard text={text} onCopy={onCopy}>
          <Button>复制</Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default forwardRef(TabsContent);
