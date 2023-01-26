import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import useSettings from '../../hooks/context/useSettings';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'default' | 'danger';
  iconOnly?: boolean;
  href?: string;
  onClick?: () => void;
  [x: string]: any;
};

const Button = ({ children, type = 'button', color = 'default', iconOnly = false, href, onClick, ...props }: Props) => {
  const {
    settings: { accentColor },
  } = useSettings();
  const Element = (href ? Link : 'button') as keyof JSX.IntrinsicElements;

  const colorTypes = {
    primary: clsx('text-white', `bg-accent-${accentColor}-500`),
    default: 'bg-white/10 text-white hover:bg-white/20',
    danger: 'bg-theme-danger text-white',
  };

  const paddingClasses = iconOnly ? 'p-2' : 'px-4 py-2 min-w-[80px]';

  return (
    <Element
      {...(href ? { href } : { onClick })}
      className={clsx('inline-flex justify-center rounded-lg font-semibold transition-colors duration-300', colorTypes[color], paddingClasses)}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Button;
