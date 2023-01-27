import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// hooks
import useSnippets, { SnippetT } from '../../hooks/context/useSnippets';

// components
import Layout from '../../components/global/Layout';
import SnippetForm from '../../components/SnippetForm';

const SnippetsEdit: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [snippet, setSnippet] = useState<SnippetT>({} as SnippetT);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { loadSnippet } = useSnippets();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = await loadSnippet(id);
      setSnippet(data);

      setLoading(false);
    };

    load();
  }, [id]);

  return <Layout>{loading ? <p>Loading...</p> : <SnippetForm snippet={snippet} />}</Layout>;
};

export default SnippetsEdit;
