import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// hooks
import useSnippets, { SnippetT } from '../hooks/context/useSnippets';

// components
import Layout from '../components/global/Layout';
import MarkdownVisualizer from '../components/base/MarkdownVisualizer';

type Props = {
};

export default function Snippet({ }: Props) {
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
    <Layout heading={snippet?.name} container>
      <MarkdownVisualizer markdown={snippet?.description} />
      <pre>{JSON.stringify(snippet, null, 2)}</pre>
    </Layout>
  );
}
