import { useMemoizedFn } from 'ahooks';
import SliderCaptcha, { type ActionType } from 'rc-slider-captcha';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export type CaptchaStatus = 'pending' | 'success' | 'error';

export interface SliderCaptchaBlockProps {
  onStatusChange?: (status: CaptchaStatus) => void;
}

const imageBg = '/images/valid-bg.png';
const imageSlider = '/images/valid-slider.png';

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
          bgUrl: imageBg,
          puzzleUrl: imageSlider,
        })}
        // 设置加载延迟，防止图片加载过快时产生 Loading 状态的闪烁
        loadingDelay={300}
        onVerify={handleVerify}
        tipText={{
          success: '验证通过',
          default: '向右拖动滑块填充拼图',
          loading: '正在加载验证码...',
        }}
        // 自定义加载时的图标或样式（可选）
        loadingBoxProps={{
          style: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
        }}
      />
    </div>
  );
});

export default SliderCaptchaBlock;
