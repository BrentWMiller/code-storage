import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ActionBar = ({ children }: Props) => {
  return <div className='fixed top-16 right-8 flex items-center justify-end gap-4'>{children}</div>;
};

export default ActionBar;
