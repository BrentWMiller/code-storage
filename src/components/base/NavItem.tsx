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
      inactive: 'text-white',
      active: 'text-purple-400',
    },
    primary: {
      inactive: 'text-white bg-purple-400 rounded-full p-3',
      active: 'text-purple-400',
    },
  };

  useEffect(() => {
    setActiveRoute(router.asPath);
  }, [router.asPath]);

  return (
    <Link
      href={href}
      className={clsx('flex items-center justify-center', themeStyles[theme].inactive, activeRoute === href ? themeStyles[theme].active : '')}
    >
      {children}
    </Link>
  );
};

export default NavItem;
