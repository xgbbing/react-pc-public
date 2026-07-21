import { AnalyticsService } from '@/services';
import { EyeOutlined, RiseOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React, { lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { StatCard } from './components';
import styles from './index.less';
// 1. 懒加载重型组件
const VisitCharts = lazy(() => import('./components/VisitCharts'));
const HomePage: React.FC = () => {
  const { data: overview, loading } = useRequest(AnalyticsService.getOverview);

  useEffect(() => {
    console.log('44444');
  }, []);

  useLayoutEffect(() => {
    console.log('22222');
  }, []);

  return (
    <PageContainer ghost title={false}>
      <div>
        <div className={styles.statsRow}>
          <StatCard
            title="总访问量"
            value={overview?.totalVisits ?? 0}
            loading={loading}
            icon={<EyeOutlined />}
            color="#1677ff"
          />
          <StatCard
            title="今日访问"
            value={overview?.todayVisits ?? 0}
            loading={loading}
            growth={overview?.growth ?? 0}
            growthLabel="较昨日"
            icon={<RiseOutlined />}
            color="#52c41a"
          />
        </div>

        {/* 2. 用 Suspense 包裹，指定 fallback */}
        <Suspense fallback={<div>图表加载中...</div>}>
          <VisitCharts />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default HomePage;
