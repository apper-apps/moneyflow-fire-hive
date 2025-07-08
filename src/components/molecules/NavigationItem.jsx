import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const NavigationItem = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive 
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ApperIcon 
              name={icon} 
              size={20} 
              className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary'}
            />
          </motion.div>
          <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default NavigationItem;