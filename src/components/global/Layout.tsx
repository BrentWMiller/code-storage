import React from 'react';

type Props = {
  heading?: string;
  children: React.ReactNode;
};

const Layout = ({ heading, children }: Props) => {
  return (
    <section className='w-full h-full p-8'>
      {heading && <h1 className='text-2xl font-bold mb-8'>{heading}</h1>}

      {children}
    </section>
  );
};

export default Layout;
