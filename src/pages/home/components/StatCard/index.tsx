import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Spin, Tooltip } from 'antd';
import React from 'react';
import styles from './index.less';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  growth?: number;
  growthLabel?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  growth,
  growthLabel = '较昨日',
  loading = false,
  icon,
  color = '#1677ff',
}) => {
  const isPositive = growth !== undefined && growth >= 0;
  const isNeutral = growth === 0;

  // 格式化数字
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div
      className={styles.statCard}
      style={{ '--card-accent': color } as React.CSSProperties}
    >
      <Spin spinning={loading} size="small">
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>{title}</span>
          {icon && <span className={styles.cardIcon}>{icon}</span>}
        </div>
        <div className={styles.cardValue}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <span className={styles.valueNum}>{formatNumber(value)}</span>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {growth !== undefined && (
          <div className={styles.cardFooter}>
            <Tooltip
              title={`${growthLabel}: ${growth >= 0 ? '+' : ''}${growth.toFixed(
                2,
              )}%`}
            >
              <span
                className={`${styles.growth} ${
                  isNeutral
                    ? styles.neutral
                    : isPositive
                    ? styles.positive
                    : styles.negative
                }`}
              >
                {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span>{Math.abs(growth).toFixed(2)}%</span>
              </span>
            </Tooltip>
            <span className={styles.growthLabel}>{growthLabel}</span>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default StatCard;
