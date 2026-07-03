import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown.css'; // GitHub 风格样式
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 代码高亮主题
import MarkdownIt from 'markdown-it';
import React, { useEffect, useMemo, useState } from 'react';
import './index.less';

interface MarkdownViewerProps {
  /** Markdown 文本内容 */
  content?: string;
  /** GitHub Raw 文件 URL (例如: https://raw.githubusercontent.com/...) */
  url?: string;
  /** 加载状态下的占位内容 */
  loading?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  url,
  loading = '加载中...',
  className = '',
}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初始化 Markdown 解析器（使用 useMemo 避免重复创建）
  const md = useMemo(() => {
    return new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }
        return ''; // 使用默认的转义处理
      },
    });
  }, []);

  useEffect(() => {
    const fetchAndRender = async () => {
      // 如果直接传入了 content，直接渲染
      if (content) {
        const rawHtml = md.render(content);
        setHtmlContent(DOMPurify.sanitize(rawHtml));
        return;
      }

      // 如果传入了 url，则去请求
      if (url) {
        setLoadingState(true);
        setError(null);
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
          const text = await res.text();
          const rawHtml = md.render(text);
          setHtmlContent(DOMPurify.sanitize(rawHtml));
        } catch (err: any) {
          setError(err.message || '文档加载失败');
        } finally {
          setLoadingState(false);
        }
      }
    };

    fetchAndRender();
  }, [content, url, md]);

  if (loadingState) return <div className="markdown-body">{loading}</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    // github-markdown-css 要求必须加上 markdown-body 类名
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownViewer;
