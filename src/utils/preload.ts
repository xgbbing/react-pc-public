// 定义需要预加载的图片资源池
const IMAGE_POOL = [
  // 验证码图片
  '/images/image3.png',
  '/images/image4.png',
  // 其他页面需要的图片
  '/images/logo.png',
];

export const preloadImages = () => {
  let index = 0;
  const loadNext = () => {
    if (index >= IMAGE_POOL.length) return; // 加载完毕

    const img = new Image();
    img.decoding = 'async'; // 异步解码
    // 注意：这里不要加 loading="lazy"，因为它是脱离 DOM 的
    img.src = IMAGE_POOL[index];

    index++;

    // 核心：只在浏览器空闲时加载下一张，避免瞬间发起大量请求
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadNext);
    } else {
      setTimeout(loadNext, 200); // 兜底方案
    }
  };

  loadNext();
};
