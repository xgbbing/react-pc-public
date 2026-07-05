import { ProSkeleton } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { DocsService } from '../../services';
import './index.less';

export default function DocsViewer(props: { url: string }) {
  const [content, setContent] = useState('');

  const { loading } = useRequest(
    async () => {
      const response = await DocsService.getDocs(props.url);
      return response;
    },
    {
      onSuccess: (data) => {
        setContent(data);
      },
    },
  );

  if (loading) {
    return <ProSkeleton type="list" />;
  }

  return (
    <div className="markdown-body docs-viewer-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
