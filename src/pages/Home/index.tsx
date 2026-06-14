// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
// import { useModel, useNavigate } from '@umijs/max';
import React from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  // const { initialState } = useModel('@@initialState');
  // const { name } = useModel('global');

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* 用户：{initialState?.name} */}
        {/* <Guide name={trim(name)} /> */}
        <div>
          <h1>Hello, I am Alice.Xu. Welcome to my homepage!</h1>
          <h1>The homepage content is under development, please stay tuned!</h1>
          <h1>
            You can go to my <a href="https://github.com/xgbbing">GitHub</a>.
          </h1>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
