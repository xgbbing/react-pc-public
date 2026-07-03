import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';
import { useMemoizedFn } from 'ahooks';
import SliderCaptcha, { type ActionType } from 'rc-slider-captcha';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export type CaptchaStatus = 'pending' | 'success' | 'error';

export interface SliderCaptchaBlockProps {
  onStatusChange?: (status: CaptchaStatus) => void;
}

const SliderCaptchaBlock = forwardRef<
  { refresh: (resetErrorCount?: boolean) => void },
  SliderCaptchaBlockProps
>(({ onStatusChange }, ref) => {
  const actionRef = useRef<ActionType>();

  useImperativeHandle(ref, () => ({
    refresh: (resetErrorCount?: boolean) => {
      actionRef.current?.refresh(resetErrorCount);
    },
  }));

  const handleVerify = useMemoizedFn(async (data: { x: number }) => {
    if (data.x < 120 || data.x > 140) {
      onStatusChange?.('error');
      return Promise.reject(new Error('验证失败'));
    }
    onStatusChange?.('success');
    return Promise.resolve();
  });

  return (
    <div style={{ margin: '16px 0' }}>
      <SliderCaptcha
        actionRef={actionRef as any}
        request={async () => ({
          bgUrl: image3,
          puzzleUrl: image4,
        })}
        onVerify={handleVerify}
        tipText={{
          success: '验证通过',
          default: '向右拖动滑块填充拼图',
        }}
      />
    </div>
  );
});

export default SliderCaptchaBlock;
