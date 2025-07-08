import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationItem from '@/components/molecules/NavigationItem';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { to: '/', icon: 'BarChart3', label: 'Dashboard' },
    { to: '/transactions', icon: 'Receipt', label: 'Transactions' },
    { to: '/budget', icon: 'PieChart', label: 'Budget' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <NavigationItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      onClick={onClose}
                    />
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;