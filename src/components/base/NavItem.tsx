import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// hooks
import useSettings from '../../hooks/context/useSettings';

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
  const {
    settings: { accentColor },
  } = useSettings();
  const [activeRoute, setActiveRoute] = useState<string>('');

  const themeStyles: ThemeStyles = {
    default: {
      inactive: 'text-white/50 hover:text-white',
      active: `text-accent-${accentColor}-500`,
    },
    primary: {
      inactive: `text-white bg-accent-${accentColor}-500 rounded-md p-2 hover:opacity-80`,
      active: `text-white rounded-md p-2 bg-accent-${accentColor}-500`,
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
        activeRoute === href ? themeStyles[theme].active : themeStyles[theme].inactive
      )}
    >
      {children}
    </Link>
  );
};

export default NavItem;
