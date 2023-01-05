import React from 'react';

// components
import NavItem from '../base/NavItem';
import CodeIcon from '../../icons/CodeIcon';
import RectangleHistoryIcon from '../../icons/RectangleHistoryIcon';
import PlusIcon from '../../icons/PlusIcon';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav>
      <ul className='flex flex-col gap-7 p-5'>
        <li>
          <NavItem href='/snippets/add' theme='primary'>
            <PlusIcon className='w-5 h-5' />
          </NavItem>
        </li>
        <li>
          <NavItem href='/'>
            <RectangleHistoryIcon className='w-5 h-5' />
          </NavItem>
        </li>
        <li>
          <NavItem href='/snippets'>
            <CodeIcon className='w-5 h-5' />
          </NavItem>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
