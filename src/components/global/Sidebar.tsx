import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

// components
import Navigation from './Navigation';
import ArrowIcon from '../../icons/ArrowIcon';

type Props = {};

const sidebarSizes = {
  nav: 80,
  content: 240,
  total: 320,
  arrowSize: 40,
};

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const animations = {
    sidebar: {
      hidden: { maxWidth: 0, opacity: 0 },
      visible: { maxWidth: sidebarSizes.content, opacity: 1 },
    },
    content: {
      hidden: { opacity: 0, transition: { duration: 0.1, delay: 0 } },
      visible: { opacity: 1, transition: { delay: 0.2 } },
    },
    arrow: {
      closed: {
        rotate: 180,
        x: sidebarSizes.nav / 2 - sidebarSizes.arrowSize / 2,
      },
      open: {
        rotate: 0,
        x: sidebarSizes.content + sidebarSizes.nav - sidebarSizes.arrowSize / 2,
      },
    },
  };

  return (
    <motion.div
      initial={{ maxWidth: sidebarSizes.nav }}
      animate={{ maxWidth: isOpen ? sidebarSizes.total : sidebarSizes.nav }}
      className='relative h-screen w-full flex-shrink-0 z-10'
    >
      <motion.div
        initial={{ maxWidth: sidebarSizes.nav }}
        animate={{ maxWidth: isOpen ? sidebarSizes.total : sidebarSizes.nav }}
        className='fixed flex h-full bg-theme-sidebar divide-x divide-theme-divider'
      >
        <Navigation />

        <motion.button
          variants={animations.arrow}
          initial='closed'
          animate={isOpen ? 'open' : 'closed'}
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='absolute z-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/100 transition-colors duration-300 w-10 h-10 flex items-center justify-center rounded-full bg-theme-sidebar'
        >
          <ArrowIcon />
        </motion.button>

        <motion.div
          variants={animations.sidebar}
          initial='hidden'
          animate={isOpen ? 'visible' : 'hidden'}
          className={clsx('p-5 w-full h-full', !isOpen && 'pointer-events-none')}
        >
          <motion.div variants={animations.content} initial='hidden' animate={isOpen ? 'visible' : 'hidden'}>
            Sidebar content will go here
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
