import React from 'react';

type Props = {
  heading?: string;
  description?: string;
  container?: boolean;
  children: React.ReactNode;
};

const Layout = ({ heading, description, container = false, children }: Props) => {
  return (
    <section className='w-full h-full'>
      <div className='p-8 pt-16 flex flex-col gap-1.5'>
        {heading && <h1 className='text-2xl font-semibold font-heading'>{heading}</h1>}
        {description && <p className='text-base text-white/80'>{description}</p>}
      </div>

      {container ? <div className='px-8'>{children}</div> : children}
    </section>
  );
};

export default Layout;
