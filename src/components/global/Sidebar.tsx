import React from 'react';

// components
import Navigation from './Navigation';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className='flex h-full bg-nightowl-sidebar divide-x divide-nightowl-bg'>
      <Navigation />

      <div className='p-5 min-w-[240px]'>Sidebar content</div>
    </div>
  );
};

export default Sidebar;
