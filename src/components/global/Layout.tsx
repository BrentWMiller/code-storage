import React from 'react';

type Props = {
  heading?: string;
  description?: string;
  action?: React.ReactNode;
  tags?: string[];
  container?: boolean;
  children: React.ReactNode;
};

const Layout = ({ heading, description, action, tags, container = false, children }: Props) => {
  return (
    <section className='relative max-h-full w-full overflow-y-auto pt-16'>
      {(heading || description) && (
        <div className='flex flex-col gap-1.5 p-8 pt-0'>
          <div className=' flex items-center justify-between gap-8'>
            {heading && <h1 className='font-heading text-3xl font-bold'>{heading}</h1>} {action}
          </div>
          {tags && (
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <p key={tag} className='rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/90'>
                  {tag}
                </p>
              ))}
            </div>
          )}
          {description && <p className='text-base text-white/80'>{description}</p>}
        </div>
      )}

      {container ? <div className='px-8'>{children}</div> : children}
    </section>
  );
};

export default Layout;
