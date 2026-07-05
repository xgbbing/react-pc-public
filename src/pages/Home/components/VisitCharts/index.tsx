import {
  getDailyVisits,
  getMonthlyVisits,
  getWeeklyVisits,
} from '@/services/analyticsService';
import { useRequest } from '@umijs/max';
import { Card, Segmented, Spin } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useMemo, useState } from 'react';
import styles from './index.less';

// 注册 ECharts 组件
echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

type PeriodType = 'daily' | 'weekly' | 'monthly';

const periodOptions = [
  { label: '每日访问', value: 'daily' as PeriodType },
  { label: '每周访问', value: 'weekly' as PeriodType },
  { label: '每月访问', value: 'monthly' as PeriodType },
];

const periodApiMap: Record<PeriodType, () => Promise<any>> = {
  daily: getDailyVisits,
  weekly: getWeeklyVisits,
  monthly: getMonthlyVisits,
};

const VisitCharts: React.FC = () => {
  const [period, setPeriod] = useState<PeriodType>('daily');

  const { data, loading } = useRequest(periodApiMap[period], {
    refreshDeps: [period],
  });

  const chartOption = useMemo(() => {
    if (!data) return {};

    const isDaily = period === 'daily';
    const isWeekly = period === 'weekly';
    const isMonthly = period === 'monthly';

    const labels = data.dates || data.weeks || data.months || [];
    const values = data.values || [];

    // 计算渐变色
    const gradientColor = isDaily
      ? '#1677ff'
      : isWeekly
      ? '#722ed1'
      : '#13c2c2';

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        textStyle: { color: '#262626', fontSize: 13 },
        formatter: (params: any) => {
          const item = params[0];
          if (!item) return '';
          const dateLabel = isMonthly ? `${item.name}` : `${item.name}`;
          return `<div style="font-weight:600;margin-bottom:4px;">${dateLabel}</div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${gradientColor};"></span>
                    <span>访问量：<b>${item.value.toLocaleString()}</b></span>
                  </div>`;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#f0f0f0' } },
        axisLabel: {
          color: '#8c8c8c',
          fontSize: 11,
          formatter: (val: string) => {
            if (isMonthly) return val.slice(5);
            if (isWeekly) return val;
            // daily: show every 5 labels
            return val;
          },
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#f5f5f5', type: 'dashed' } },
        axisLabel: {
          color: '#8c8c8c',
          fontSize: 11,
          formatter: (val: number) => {
            if (val >= 10000) return `${(val / 10000).toFixed(0)}万`;
            if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
            return val.toString();
          },
        },
      },
      series: [
        {
          data: values,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: {
            width: 3,
            color: gradientColor,
          },
          itemStyle: {
            color: gradientColor,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${gradientColor}33` },
              { offset: 1, color: `${gradientColor}05` },
            ]),
          },
          markLine: {
            silent: true,
            data: [
              {
                type: 'average',
                name: '平均值',
                label: {
                  formatter: '均值: {c}',
                  position: 'insideEndTop',
                  fontSize: 11,
                  color: '#8c8c8c',
                },
                lineStyle: { type: 'dashed', color: '#ffa940', width: 1.5 },
              },
            ],
          },
        },
      ],
    };
  }, [data, period]);

  return (
    <Card
      className={styles.chartCard}
      title={<span className={styles.chartTitle}>📊 访问量趋势</span>}
      extra={
        <Segmented
          options={periodOptions}
          value={period}
          onChange={(val) => setPeriod(val as PeriodType)}
          size="small"
        />
      }
    >
      <Spin spinning={loading} tip="加载中...">
        <div className={styles.chartContainer}>
          <ReactEChartsCore
            echarts={echarts}
            option={chartOption}
            notMerge
            lazyUpdate
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </Spin>
    </Card>
  );
};

export default VisitCharts;
