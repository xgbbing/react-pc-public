// 定义需要预加载的图片资源池
import validBg from '@/assets/images/valid-bg.png';
import validSlider from '@/assets/images/valid-slider.png';

const IMAGE_POOL = [validBg, validSlider];

export function preloadImagesOnIdle() {
  // 不支持 requestIdleCallback 的浏览器直接放弃，保持低姿态
  if (!window.requestIdleCallback) return;

  let index = 0;
  const loadNextChunk = (deadline: IdleDeadline) => {
    // 只在有剩余空闲时间时才加载，不强制触发
    while (deadline.timeRemaining() > 0 && index < IMAGE_POOL.length) {
      const img = new Image();
      img.src = IMAGE_POOL[index];
      index++;
    }

    // 如果还有剩余图片，继续等待下一次空闲
    if (index < IMAGE_POOL.length) {
      requestIdleCallback(loadNextChunk);
    }
  };

  requestIdleCallback(loadNextChunk);
}
