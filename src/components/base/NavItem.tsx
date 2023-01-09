import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// components
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  href: string;
  theme?: 'default' | 'primary';
};

type ThemeStyles = {
  [key: string]: {
    inactive: string;
    active: string;
  };
};

const NavItem = ({ children, href, theme = 'default' }: Props) => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>('');

  const themeStyles: ThemeStyles = {
    default: {
      inactive: 'text-white/50 hover:text-white',
      active: 'text-accent-cyan hover:text-accent-cyan',
    },
    primary: {
      inactive: 'text-white bg-accent-cyan rounded-md p-2 hover:bg-accent-cyan/80',
      active: 'text-white',
    },
  };

  useEffect(() => {
    setActiveRoute(router.asPath);
  }, [router.asPath]);

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center justify-center transition-colors duration-300',
        themeStyles[theme].inactive,
        activeRoute === href ? themeStyles[theme].active : ''
      )}
    >
      {children}
    </Link>
  );
};

export default NavItem;
