import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// hooks
import useSnippets, { SnippetFileT, SnippetT } from '../hooks/context/useSnippets';

// components
import Layout from '../components/global/Layout';
import MarkdownVisualizer from '../components/base/MarkdownVisualizer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ChevronDown from '../icons/ChevronDown';
import Button from '../components/base/Button';

type Props = {};

export default function Snippet({}: Props) {
  const [snippet, setSnippet] = useState<SnippetT>({} as SnippetT);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { loadSnippet } = useSnippets();

  useEffect(() => {
    const load = async () => {
      const data = await loadSnippet(id);
      setSnippet(data);
    };

    load();
  }, [id]);

  return (
    <Layout heading={snippet?.name} tags={snippet?.tags}>
      <div className='px-8 pb-16'>
        <MarkdownVisualizer markdown={snippet?.description} />
      </div>

      {snippet?.files?.length > 0 && snippet.files?.map((file) => <SnippetFile key={file.name} file={file} />)}
    </Layout>
  );
}

const SnippetFile = ({ file }: { file: SnippetFileT }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section key={file.name}>
      <header className='flex items-center gap-3 bg-theme-sidebar/50 px-8 py-4'>
        <h2 className='text-lg font-semibold'>{file.name}</h2>
        <Button onClick={() => setExpanded(!expanded)} aria-label='Expand file contents' iconOnly>
          <ChevronDown className={clsx('h-4 w-4 transition-transform duration-300', expanded ? 'rotate-180' : '')} />
        </Button>
      </header>

      <motion.div className='relative overflow-y-hidden' initial={{ height: 200 }} animate={{ height: expanded ? '100%' : 200 }}>
        {file.value && (
          <SyntaxHighlighter
            children={file.value}
            style={dracula}
            language={file.extension}
            PreTag='div'
            className='!bg-transparent'
            showLineNumbers
          />
        )}

        <button
          type='button'
          onClick={() => setExpanded(!expanded)}
          className={clsx(
            'absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-theme-bg transition-opacity duration-300',
            expanded ? 'pointer-events-none opacity-0' : 'opacity-100'
          )}
        ></button>
      </motion.div>
    </section>
  );
};
