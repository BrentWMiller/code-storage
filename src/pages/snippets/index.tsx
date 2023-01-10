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
      <div className='flex flex-col'>
        {snippets.map((snippet) => (
          <div>{snippet.name}</div>
        ))}
      </div>
    </Layout>
  );
};

export default Snippets;
