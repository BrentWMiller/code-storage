import { NextPage } from 'next';
import { useEffect } from 'react';

// hooks
import useSnippets from '../../hooks/context/useSnippets';

// components
import Layout from '../../components/global/Layout';

const Snippets: NextPage = () => {
  const { loadSnippets, snippets } = useSnippets();

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <Layout heading='Snippets' description='All your available code snippets' container>
      Index
    </Layout>
  );
};

export default Snippets;
