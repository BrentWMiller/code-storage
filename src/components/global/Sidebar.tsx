import React from 'react';

// components
import Navigation from './Navigation';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className='flex h-full bg-gray-800 divide-x divide-gray-700'>
      <Navigation />

      <div className='p-5'>Sidebar content</div>
    </div>
  );
};

export default Sidebar;
