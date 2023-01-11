import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// components
import Link from 'next/link';
import clsx from 'clsx';

type Props = {};

const Breadcrumb = (props: Props) => {
  const router = useRouter();
  const [path, setPath] = React.useState<string[]>([]);

  useEffect(() => {
    // generate breadcrumb path
    const path = router.asPath.split('/').filter((item) => item !== '');
    setPath(path);
  }, [router.asPath]);

  return (
    <nav className='text-white pl-10'>
      <ol className='list-none p-0 inline-flex'>
        <li>
          <Link
            href='/'
            className={clsx('hover:text-white transition-colors duration-300 capitalize text-sm', path.length === 0 ? 'text-white' : 'text-gray-500')}
          >
            Home
          </Link>

          {path.length > 0 && <span className='px-3 text-gray-600'>/</span>}
        </li>

        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          const href = `/${path.slice(0, index + 1).join('/')}`;

          return (
            <li key={item} className='flex items-center'>
              <Link href={href} className={clsx('hover:text-white transition-colors duration-300 capitalize text-sm', !isLast && 'text-gray-500')}>
                {item}
              </Link>

              {!isLast && <span className='px-3 text-gray-600'>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
