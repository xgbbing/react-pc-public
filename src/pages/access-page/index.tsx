import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { App, Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const { message } = App.useApp();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>

      <Button onClick={() => message.info('1111')}>提示</Button>
    </PageContainer>
  );
};

export default AccessPage;
