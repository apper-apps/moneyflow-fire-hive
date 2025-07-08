import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { formatDate } from '@/utils/formatters';

const Header = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <ApperIcon name="DollarSign" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MoneyFlow
              </h1>
              <p className="text-sm text-gray-500">Personal Finance Tracker</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Calendar" size={16} />
            <span>{formatDate(new Date())}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;