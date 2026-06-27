import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';
import useCommonInfo from '@/context/commonContext/useCommonInfo';
import { Button, Space } from 'antd';
import SliderCaptcha from 'rc-slider-captcha';
import React from 'react';

const TabsContent: React.FC = () => {
  const { state, updatedStepsKey } = useCommonInfo();

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
    </div>
  );
};

export default TabsContent;
