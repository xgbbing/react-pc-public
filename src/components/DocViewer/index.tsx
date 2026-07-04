import 'highlight.js/styles/github.css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { getDocs } from '../../services/docsService';

export default function DocViewer(props: { url: string }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    getDocs(props.url).then(setContent);
  }, []);

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
