import React from 'react';

// components
import NavItem from '../base/NavItem';
import CodeIcon from '../../icons/CodeIcon';
import PlusIcon from '../../icons/PlusIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import ContainerIcon from '../../icons/ContainerIcon';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className='flex flex-col justify-between items-center h-full p-5 w-[80px] pt-16'>
      <ul className='flex flex-col gap-5'>
        <li>
          <NavItem href='/snippets/add' theme='primary'>
            <PlusIcon className='w-6 h-6' />
          </NavItem>
        </li>
        <li>
          <NavItem href='/'>
            <ContainerIcon className='w-6 h-6' />
          </NavItem>
        </li>
        <li>
          <NavItem href='/snippets'>
            <CodeIcon className='w-6 h-6' />
          </NavItem>
        </li>
      </ul>

      <ul className='flex flex-col gap-5'>
        <li>
          <NavItem href='/settings'>
            <SettingsIcon className='w-6 h-6' />
          </NavItem>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
