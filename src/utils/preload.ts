// 定义需要预加载的图片资源池
const IMAGE_POOL = [
  // 验证码图片
  '/images/image3.png',
  '/images/image4.png',
  // 其他页面需要的图片
  '/images/logo.png',
];

export const preloadImages = () => {
  const task = () => {
    IMAGE_POOL.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  // 如果浏览器支持 requestIdleCallback，则空闲时执行
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task);
  } else {
    // 降级处理：延迟 2 秒后执行
    setTimeout(task, 2000);
  }
};
