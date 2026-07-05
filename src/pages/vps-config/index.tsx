import DocViewer from '@/components/DocViewer';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

const VPSConfig: React.FC = () => {
  return (
    <PageContainer ghost title={false}>
      <div>
        <DocViewer url="/docs/README.md" />
      </div>
    </PageContainer>
  );
};

export default VPSConfig;
