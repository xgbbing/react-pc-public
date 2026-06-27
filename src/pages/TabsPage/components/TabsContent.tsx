import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';
import useCommonInfo from '@/context/commonContext/useCommonInfo';
import { getUrlParameter } from '@/utils/format';
import { useDebounceFn, useMemoizedFn, useRequest } from 'ahooks';
import { Button, message, Space } from 'antd';
import SliderCaptcha from 'rc-slider-captcha';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const TabsContent: React.FC = () => {
  const { state, updatedStepsKey } = useCommonInfo();
  const text = 'Hello, world!';
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

      <div>滑块验证码</div>
      <div>
        <SliderCaptcha
          request={async () => {
            return {
              bgUrl: image3,
              puzzleUrl: image4,
            };
          }}
          onVerify={async (data) => {
            console.log(data);
            if (data.x < 120 || data.x > 140) {
              return Promise.reject('验证失败');
            }
            return Promise.resolve();
          }}
        />
      </div>

      <div>
        <CopyToClipboard text={text} onCopy={onCopy}>
          <Button>复制</Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default TabsContent;
