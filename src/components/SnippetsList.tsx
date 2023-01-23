import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

// hooks
import useSettings from '../hooks/context/useSettings';
import useSnippets from '../hooks/context/useSnippets';
import SearchIcon from '../icons/SearchIcon';

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
        <div className='relative'>
          <input
            type='text'
            className={clsx(
              'w-full bg-theme-input py-2 pr-3 pl-10 font-normal rounded-lg text-white border-2 border-theme-divider',
              `focus:ring-2 outline-none ring-accent-${accentColor}-500`
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-5 h-5 pointer-events-none' />
        </div>
      </div>

      <ul className='flex flex-col'>
        {filteredSnippets.map(({ path, name, tags }) => (
          <li key={path} className='block py-5 px-5'>
            <p className='text-base leading-tight font-medium'>{name}</p>
            {tags?.length > 0 ? (
              <div className='flex flex-wrap gap-2 mt-2'>
                {tags.map((tag) => (
                  <p key={tag} className={clsx('text-xs px-1.5 py-0.5 rounded-full', `text-white/90 bg-white/10`)}>
                    {tag}
                  </p>
                ))}
              </div>
            ) : (
              <p className='text-xs text-gray-500 italic mt-2'>No tags</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetsList;
