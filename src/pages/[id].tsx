import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/prism-light';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// hooks
import useSnippets, { SnippetFileT, SnippetT } from '../hooks/context/useSnippets';

// icons
import ChevronDown from '../icons/ChevronDown';
import ClipboardIcon from '../icons/Clipboard';

// components
import Layout from '../components/global/Layout';
import MarkdownVisualizer from '../components/base/MarkdownVisualizer';
import useSettings from '../hooks/context/useSettings';
import Link from 'next/link';

type Props = {};

export default function Snippet({}: Props) {
  const [snippet, setSnippet] = useState<SnippetT>({} as SnippetT);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { loadSnippet } = useSnippets();
  const {
    settings: { accentColor },
  } = useSettings();

  useEffect(() => {
    const load = async () => {
      const data = await loadSnippet(id);
      setSnippet(data);
    };

    load();
  }, [id]);

  return (
    <Layout heading={snippet?.name} tags={snippet?.tags} action={<Link href={`/edit/${snippet.id}`}>Edit</Link>}>
      <div className='px-8 pb-16'>
        <MarkdownVisualizer markdown={snippet?.description} />
      </div>

      {snippet?.files?.length > 0 && snippet.files?.map((file) => <SnippetFile key={file.name} file={file} accentColor={accentColor} />)}
    </Layout>
  );
}

const SnippetFile = ({ file, accentColor }: { file: SnippetFileT; accentColor: string }) => {
  const [expanded, setExpanded] = useState(false);

  const copyFile = () => {
    navigator.clipboard.writeText(file.value);
  };

  return (
    <section key={file.name}>
      <header className='flex items-center justify-between gap-3 bg-theme-sidebar/50 px-8 py-4'>
        <div className='flex items-center gap-3'>
          <h2 className='text-lg font-semibold'>{file.name}</h2>
          <button
            type='button'
            onClick={() => setExpanded(!expanded)}
            title='Expand file contents'
            className='rounded-lg p-2 transition-colors duration-300 hover:bg-white/20'
          >
            <ChevronDown className={clsx('h-4 w-4 transition-transform duration-300', expanded ? 'rotate-180' : '')} />
          </button>
        </div>

        <button
          type='button'
          onClick={() => copyFile()}
          className={clsx(
            'flex items-center gap-2 rounded-lg p-2 transition-colors duration-300',
            `text-accent-${accentColor}-500 hover:bg-accent-${accentColor}-500/20`
          )}
        >
          <ClipboardIcon className='h-4 w-4 flex-shrink-0 transition-transform duration-300' />
          <span>Copy code</span>
        </button>
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
