import React from 'react';

type Props = {
  heading?: string;
  container?: boolean;
  children: React.ReactNode;
};

const Layout = ({ heading, container = false, children }: Props) => {
  return (
    <section className='w-full h-full'>
      {heading && <h1 className='text-2xl font-semibold p-8'>{heading}</h1>}

      {container ? <div className='px-8'>{children}</div> : children}
    </section>
  );
};

export default Layout;
