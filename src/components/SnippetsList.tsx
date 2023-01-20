import React, { useEffect } from 'react';

// hooks
import useSnippets from '../hooks/context/useSnippets';

type Props = {};

const SnippetsList = (props: Props) => {
  const { loadSnippets, snippets } = useSnippets();

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <div className='flex flex-col'>
      {snippets.map((snippet) => (
        <div key={snippet.path}>{snippet.name}</div>
      ))}
    </div>
  );
};

export default SnippetsList;
