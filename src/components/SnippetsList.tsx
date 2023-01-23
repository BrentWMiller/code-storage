import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

// hooks
import useSettings from '../hooks/context/useSettings';
import useSnippets from '../hooks/context/useSnippets';

type Props = {};

const SnippetsList = (props: Props) => {
  const { loadSnippets, snippets } = useSnippets();
  const {
    settings: { accentColor },
  } = useSettings();
  const [search, setSearch] = useState<string>('');

  const filteredSnippets = snippets.filter((snippet) => {
    const searchValue = search.toLowerCase();

    if (searchValue !== '') {
      let tagsMatch = false;
      if (snippet.tags?.length > 0) {
        tagsMatch = snippet.tags.some((tag) => tag.toLowerCase().includes(searchValue));
      }

      return snippet.name.toLowerCase().includes(searchValue) || tagsMatch;
    } else {
      return true;
    }
  });

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <div className='px-5'>
        <input
          type='text'
          className={clsx(
            'w-full bg-theme-input py-2 px-3 font-normal rounded-lg text-white border-2 border-gray-600',
            `focus:ring-2 outline-none ring-accent-${accentColor}-500 focus:border-accent-${accentColor}-500`
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className='flex flex-col'>
        {filteredSnippets.map(({ path, name, tags }) => (
          <li key={path} className='block py-4 border-t border-theme-divider px-5'>
            <p className='text-base leading-tight font-medium'>{name}</p>
            {tags?.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-2'>
                {tags.map((tag) => (
                  <p key={tag} className='text-xs text-gray-400 bg-gray-800 px-1.5 py-1 rounded-full'>
                    #{tag}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetsList;
