import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clsx from 'clsx';

// hooks
import useSettings from '../../hooks/context/useSettings';

type Props = {
  markdown: string;
};

const MarkdownVisualizer = ({ markdown }: Props) => {
  const {
    settings: { accentColor },
  } = useSettings();

  return (
    <div
      className={clsx(
        'prose prose-blockquote:text-gray-200 prose-strong:text-white prose-pre:border-2 prose-pre:border-theme-divider prose-pre:bg-transparent',
        `prose-${accentColor} prose-headings:text-accent-${accentColor}-500`
      )}
    >
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className='relative'>
                <p className='absolute top-0 right-0 m-0 text-right text-xs italic text-gray-400'>{match[1]}</p>
                <SyntaxHighlighter children={String(children).replace(/\n$/, '')} style={dracula} language={match[1]} PreTag='div' {...props} />
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownVisualizer;
