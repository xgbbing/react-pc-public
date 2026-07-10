import React, { useCallback, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

// 模拟生成海量数据
const generateData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.floor(Math.random() * 1000),
  }));

/**
 * 海量数据页面处理
 * @returns
 */
const HeavyPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [summary, setSummary] = useState('正在计算...');
  const [scrollY, setScrollY] = useState(0);

  // 初始化海量数据
  useEffect(() => {
    setData(generateData(100000));
  }, []);

  // 【requestIdleCallback】：非紧急的耗时统计
  // 绝不阻塞页面的渲染和用户的点击操作
  useEffect(() => {
    if (!data.length) return;

    const callback = (deadline: IdleDeadline) => {
      // 检查浏览器当前帧是否还有剩余时间
      if (deadline.timeRemaining() > 0) {
        // 执行耗时的数据聚合计算
        const sum = data.reduce((acc, cur) => acc + cur.value, 0);
        setSummary(`总计 ${data.length} 条数据，总和为: ${sum}`);
      } else {
        // 如果当前帧没时间了，让浏览器继续调度
        requestIdleCallback(callback);
      }
    };

    requestIdleCallback(callback);
  }, [data]);

  // 【requestAnimationFrame】：平滑的滚动监听
  // 避免直接监听 scroll 事件导致高频触发和页面掉帧
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      // 取消上一帧的回调，合并多次滚动事件
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId); // 组件卸载时清理
    };
  }, []);

  // 模拟不同的高度
  // const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 55));

  // 【react-window】：虚拟表格渲染
  // 数据只渲染视口内的约 20 个 DOM 节点
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = data[index];
      return (
        <div
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
          }}
        >
          <span style={{ flex: 1 }}>{item.id}</span>
          <span style={{ flex: 2 }}>{item.name}</span>
          <span style={{ flex: 1 }}>{item.value}</span>
        </div>
      );
    },
    [data],
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>复杂业务页面性能优化演示</h2>
      <p style={{ color: '#666' }}>当前滚动位置: {Math.round(scrollY)} px</p>
      <p style={{ color: 'green' }}>{summary}</p>

      {/* 虚拟列表：固定高度 500px，行高 40px */}
      <div style={{ border: '1px solid #ccc', borderRadius: 4 }}>
        <div
          style={{
            display: 'flex',
            padding: '0 10px',
            fontWeight: 'bold',
            background: '#fafafa',
          }}
        >
          <span style={{ flex: 1 }}>ID</span>
          <span style={{ flex: 2 }}>名称</span>
          <span style={{ flex: 1 }}>数值</span>
        </div>
        <List
          height={500} // 列表容器高度（必填）
          itemCount={data.length} // 列表项总数（必填）
          itemSize={40} // 每个列表项的高度（必填）
          // itemSize={(index) => rowSizes[index]} // 传入函数
          width="100%" // 列表容器宽度（必填）
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default HeavyPage;
