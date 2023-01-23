import React from 'react';
import { motion } from 'framer-motion';

// hooks
import useTheme from '../../hooks/context/useTheme';

// components
import SidebarIcon from '../../icons/SidebarIcon';
import Breadcrumb from './Breadcrumb';

type Props = {};

const TitleBar = ({}: Props) => {
  const { sidebarOpen, setSidebarOpen } = useTheme();

  const animation = {
    closed: { paddingLeft: '96px', transition: { duration: 0.01, ease: 'linear' } },
    open: { paddingLeft: '350px', transition: { duration: 0.01, ease: 'linear' } },
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <motion.div
      data-tauri-drag-region
      variants={animation}
      initial='closed'
      animate={sidebarOpen ? 'open' : 'closed'}
      className='fixed inset-0 w-full z-50 max-h-11 py-2 bg-theme-sidebar flex items-center transition-[padding] duration-300 border-b border-theme-divider'
    >
      <button onClick={() => handleSidebarToggle()} type='button'>
        <SidebarIcon className='text-white/50 w-4 h-4 hover:text-white duration-300 transition-colors' />
      </button>

      <Breadcrumb />
    </motion.div>
  );
};

export default TitleBar;
