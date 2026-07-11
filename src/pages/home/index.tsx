import { AnalyticsService } from '@/services';
import { EyeOutlined, RiseOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React from 'react';
import { StatCard, VisitCharts } from './components';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { data: overview, loading } = useRequest(AnalyticsService.getOverview);

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

        <VisitCharts />
      </div>
    </PageContainer>
  );
};

export default HomePage;
