import React from 'react';

type Props = {
  heading?: string;
  description?: string;
  container?: boolean;
  children: React.ReactNode;
};

const Layout = ({ heading, description, container = false, children }: Props) => {
  return (
    <section className='relative w-full h-full pt-16'>
      {(heading || description) && (
        <div className='p-8 pt-0 flex flex-col gap-1.5'>
          {heading && <h1 className='text-3xl font-bold font-heading'>{heading}</h1>}
          {description && <p className='text-base text-white/80'>{description}</p>}
        </div>
      )}

      {container ? <div className='px-8'>{children}</div> : children}
    </section>
  );
};

export default Layout;
