import clsx from 'clsx';
import Link from 'next/link';
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
    <div className='flex h-full flex-col gap-8'>
      <div className='flex items-center gap-3 px-5'>
        <div className='relative'>
          <input
            type='text'
            className={clsx(
              'w-full rounded-lg border-2 border-theme-divider bg-theme-input py-2 pr-3 pl-10 font-normal text-white',
              `outline-none focus:ring-2 ring-accent-${accentColor}-500`
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className='pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400' />
        </div>
      </div>

      <ul className='flex flex-col'>
        {filteredSnippets.map(({ id, name, tags }) => (
          <li key={id} className='block py-5 px-5'>
            <div>
              <Link href={`/${id}`} className='text-base font-medium leading-tight hover:underline'>
                {name}
              </Link>

              {tags?.length > 0 ? (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearch(tag)}
                      className='rounded-full bg-white/10 px-1.5 py-0.5 text-xs text-white/90 hover:bg-white/30'
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : (
                <p className='mt-2 text-xs italic text-gray-500'>No tags</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetsList;
