import { ProSkeleton } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import 'highlight.js/styles/github.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { DocsService } from '../../services';

export default function DocViewer(props: { url: string }) {
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
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
