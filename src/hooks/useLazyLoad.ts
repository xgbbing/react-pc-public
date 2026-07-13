import { useEffect, useRef, useState } from 'react';

export default function useLazyLoad(src = '', placeholder = '') {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);

  useEffect(() => {
    // 如果已经加载过了，直接返回
    if (currentSrc === src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 200px 0px' }, // 提前200px加载
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { ref: imgRef, src: currentSrc };
}
