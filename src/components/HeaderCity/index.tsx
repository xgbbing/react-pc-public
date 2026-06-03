import { useModel } from '@umijs/max';
import { Select } from 'antd';
import React from 'react';

const CITY_OPTIONS = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '广州',
    value: 'guangzhou',
  },
  {
    label: '深圳',
    value: 'shenzhen',
  },
];
const HeaderCity: React.FC = () => {
  const { city, setCity } = useModel('global');

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16 }}>
      <span style={{ marginRight: 8, whiteSpace: 'nowrap' }}>城市：</span>
      <Select
        value={city}
        options={CITY_OPTIONS}
        onChange={setCity}
        style={{ width: 120 }}
      />
    </div>
  );
};

export default HeaderCity;
