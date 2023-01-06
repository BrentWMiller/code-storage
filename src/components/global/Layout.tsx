import React from 'react';

type Props = {
  heading?: string;
  children: React.ReactNode;
};

const Layout = ({ heading, children }: Props) => {
  return (
    <section className='w-full h-full'>
      {heading && <h1 className='text-2xl font-bold p-8'>{heading}</h1>}

      {children}
    </section>
  );
};

export default Layout;
