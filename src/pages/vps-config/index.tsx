import DocsViewer from '@/components/DocsViewer';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import React from 'react';

const VPSConfig: React.FC = () => {
  const { pathname } = useLocation();
  const pageMap: any = {
    '/vps-config/docker-compose': 'DockerCompose容器方案',
    '/vps-config/linux-command': 'Linux系统常用命令',
    '/vps-config/cache-clear': '缓存文件清理',
    '/vps-config/cross-domain': '跨域浏览器开启',
    '/vps-config/ssh': 'SSH密钥登录',
    '/vps-config/ssh-port': 'SSH修改端口号',
    '/vps-config/ssh-password': 'SSH修改密码',
    '/vps-config/v2ray': 'V2Ray和vmess',
    '/vps-config/vpn-speed': 'VPN速度优化',
    '/vps-config/xray': 'XRay-vless-reality',
  };
  const name = pageMap[pathname] || 'README';
  const url = `/docs/${name}.md`;

  return (
    <PageContainer ghost title={false}>
      <div>
        <DocsViewer url={url} />
      </div>
    </PageContainer>
  );
};

export default VPSConfig;
