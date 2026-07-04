// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
// import { useClientLoaderData } from '@umijs/max';
// import MarkdownViewer from '@/components/MarkdownViewer';
import DocViewer from '@/components/DocViewer';
import React from 'react';
import styles from './index.less';

// export async function clientLoader() {
//   const response = await fetch(
//     'https://raw.githubusercontent.com/xgbbing/vps-config/main/README.md',
//   );
//   const markdownText = await response.text();
//   return { markdownText };
// }

const HomePage: React.FC = () => {
  // const { initialState } = useModel('@@initialState');
  // const { name } = useModel('global');
  // const { data } = useClientLoaderData();

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <DocViewer url="/docs/README.md" />
        {/* <MarkdownViewer url="https://raw.githubusercontent.com/xgbbing/vps-config/main/README.md" /> */}
        {/* 用户：{initialState?.name} */}
        {/* <Guide name={trim(name)} /> */}
        {/* <div>
          <h1>Hello, I am Alice.Xu. Welcome to my homepage!</h1>
          <h1>The homepage content is under development, please stay tuned!</h1>
          <h1>
            You can go to my <a href="https://github.com/xgbbing">GitHub</a>.
          </h1>
        </div> */}
      </div>
    </PageContainer>
  );
};

export default HomePage;
