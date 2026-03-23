import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import DataObjectIcon from '@mui/icons-material/DataObject';

const navItems = [
  { text: 'About', icon: <PersonIcon />, path: '/' },
  { text: 'Experience', icon: <WorkIcon />, path: '/experience' },
  { text: 'Skills', icon: <CodeIcon />, path: '/skills' },
  { text: 'Projects', icon: <DataObjectIcon />, path: '/projects' },
  { text: 'Pricing', icon: <AttachMoneyIcon />, path: '/pricing' },
  { text: 'Contact', icon: <EmailIcon />, path: '/contact' },
];

const NavigationDock = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 p-2 rounded-full bg-[#1e293b]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.text} to={item.path} className="relative group">
              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-[#7B61FF] to-[#00E5FF] text-white shadow-lg shadow-[#7B61FF]/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#0a0a0c] text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
                {item.text}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default NavigationDock;
